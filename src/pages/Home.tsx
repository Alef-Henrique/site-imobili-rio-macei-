import { motion, useScroll, useTransform, useInView, animate } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Search, MapPin, TrendingUp, ShieldCheck, UserCheck, Headset, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import PropertyCard from '../components/PropertyCard';
import { allProperties, testimonials } from '../data/mockData';
import { SearchFilters } from '../components/SearchFilters';
import { PropertyResults } from '../components/PropertyResults';
import { GoogleMapsAuthGuard } from '../components/GoogleMapsAuthGuard';
import { mockProperties, Property } from '../data/properties';
import { APIProvider } from '@vis.gl/react-google-maps';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';

const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => setCount(Math.floor(latest)),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const images = [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1920',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1920',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1920',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=1920'
  ];

  const [searchResults, setSearchResults] = useState<Property[]>(mockProperties);
  const [isSearching, setIsSearching] = useState(false);

  return (
    <APIProvider apiKey={API_KEY}>
      <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section id="inicio" ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 5000 }}
            loop
            className="h-full w-full"
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img src={img} alt="Luxury Real Estate" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <div className="relative z-20 px-6 md:px-12 text-left w-full max-w-7xl mx-auto flex flex-col items-start pt-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-6xl md:text-8xl lg:text-[110px] font-light text-white leading-[0.9] tracking-tighter mb-8 italic-serif">
              Encontre o <br />
              <span className="font-black text-sky-500 not-italic uppercase tracking-tighter">Imóvel Ideal</span> <br />
              em Maceió
            </h1>
            <p className="text-lg md:text-xl text-white/70 font-light max-w-lg mb-10 leading-relaxed uppercase tracking-[0.15em]">
              Casas modernas, apartamentos sofisticados e imóveis exclusivos na orla mais desejada do Nordeste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <button 
                onClick={() => {
                  const el = document.getElementById('propriedades');
                  if(el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                }}
                className="bg-sky-500 hover:bg-sky-600 text-white px-10 py-5 rounded-xl font-bold text-sm uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-sky-500/20 cursor-pointer"
              >
                Ver Catálogo
              </button>
              <button className="px-8 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-semibold flex items-center gap-3 hover:bg-white/20 transition-all uppercase text-xs tracking-widest cursor-pointer">
                Falar no WhatsApp
              </button>
            </div>
          </motion.div>
        </div>

      </section>

      {/* Search Bar Section */}
      <section className="relative z-30 py-12 px-6 md:px-12 bg-white">
        <GoogleMapsAuthGuard>
          <SearchFilters 
            onResults={setSearchResults} 
            loading={isSearching} 
            onSearchStateChange={setIsSearching}
          />
        </GoogleMapsAuthGuard>
      </section>

      {/* Featured Properties Section (Dynamically updated by search) */}
      <section id="propriedades" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <PropertyResults properties={searchResults} loading={isSearching} />
        </div>
      </section>


      {/* Company History Section */}
      <section className="py-24 md:py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-sky-100 rounded-2xl -z-10" />

              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                alt="Escritório Maceió Premium" 
                className="w-full aspect-[4/5] object-cover rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-10 -right-10 hidden md:block p-8 bg-sky-600 text-white rounded-2xl shadow-xl max-w-[200px]">
                <span className="text-3xl font-black block mb-1">15+</span>
                <span className="text-[10px] uppercase font-bold tracking-widest leading-tight">Anos transformando sonhos em realidade</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 space-y-8"
            >
              <div className="space-y-4">
                <span className="text-sky-600 font-bold tracking-[0.4em] text-xs uppercase block">Nossa História</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl text-luxury-gray uppercase leading-tight font-black">
                  Tradição e <br />
                  <span className="font-light italic text-sky-600">Inovação Imobiliária</span>
                </h2>
              </div>
              
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                <p>
                  Fundada em 2009, a Maceió Premium nasceu de uma visão clara: elevar o padrão do mercado imobiliário alagoano, unindo a hospitalidade de nossa terra com a sofisticação das maiores metrópoles mundiais.
                </p>
                <p>
                  Ao longo de mais de uma década, não apenas vendemos imóveis; curamos experiências. Nossa curadoria rigorosa seleciona apenas o que há de mais exclusivo na orla de Maceió e em condomínios de luxo.
                </p>
                <p>
                  Acreditamos que um imóvel é o cenário onde a história de uma vida acontece. Por isso, nossa equipe de especialistas jurídicos e consultores de investimento trabalha para garantir que seu próximo passo seja dado com total segurança e excelência.
                </p>
              </div>

              <div className="pt-6">
                <button className="px-10 py-5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-sky-600 transition-all shadow-lg hover:shadow-sky-200 cursor-pointer">
                  Conheça Nossos Valores
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience / Stats Section (Dark Contrast) */}
      <section id="sobre" className="h-auto py-20 md:py-32 bg-slate-900 text-white flex flex-col md:flex-row items-center px-6 md:px-12 justify-between gap-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-full bg-sky-600/5 blur-[120px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 relative z-10 w-full md:w-auto">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-5xl md:text-7xl font-bold text-sky-400 mb-2">
              <Counter value={15} suffix="+" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold">Anos de Mercado</span>
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-5xl md:text-7xl font-bold text-sky-400 mb-2">
              <Counter value={450} />
            </span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold">Imóveis Vendidos</span>
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-5xl md:text-7xl font-bold text-sky-400 mb-2">
              <Counter value={100} suffix="%" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold">Segurança Jurídica</span>
          </div>
        </div>

        <div className="flex flex-col text-center md:text-right relative z-10">
          <span className="text-sm md:text-md text-slate-400 italic mb-4 uppercase tracking-[0.3em] max-w-sm ml-auto">
            "Referência em Imóveis de Alto Padrão no Nordeste"
          </span>
          <div className="flex gap-4 justify-center md:justify-end">
            {['IG', 'FB', 'IN'].map((social) => (
              <div key={social} className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 text-[10px] font-bold hover:text-sky-400 hover:border-sky-400 cursor-pointer transition-all">
                {social}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sky-600 font-bold tracking-[0.4em] text-xs uppercase mb-4 block"
          >
            Por Que Nos Escolher?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl text-luxury-gray uppercase"
          >
            O Diferencial da <span className="font-light italic text-sky-600">Maceió Premium</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: TrendingUp, title: 'Valorização Imobiliária', text: 'Imóveis selecionados nas áreas de maior crescimento de Maceió.' },
            { icon: ShieldCheck, title: 'Segurança Jurídica', text: 'Análise completa de toda a documentação para sua tranquilidade.' },
            { icon: UserCheck, title: 'Foco no Cliente', text: 'Atendimento personalizado para entender suas reais necessidades.' },
            { icon: Headset, title: 'Suporte 24/7', text: 'Nossa equipe está sempre disponível para tirar suas dúvidas.' }
          ].map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 bg-white rounded-3xl border border-slate-50 shadow-sm hover:shadow-xl transition-all duration-500 group"
            >
              <div className="w-14 h-14 bg-soft-blue rounded-2xl flex items-center justify-center text-sky-600 mb-6 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-500">
                <benefit.icon size={28} />
              </div>
              <h3 className="text-lg font-bold text-luxury-gray uppercase tracking-tight mb-4">{benefit.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{benefit.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-600/10 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] -ml-24 -mb-24" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="text-sky-500 font-bold tracking-[0.4em] text-xs uppercase mb-4 block">Feedback</span>
            <h2 className="text-4xl md:text-5xl uppercase leading-tight">
              O Que Nossos <br />
              <span className="font-light italic text-sky-500">Clientes Dizem</span>
            </h2>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000 }}
            pagination={{ clickable: true }}
            spaceBetween={30}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-20"
          >
            {testimonials.map((testi) => (
              <SwiperSlide key={testi.id}>
                <div className="glass-dark p-8 rounded-3xl border-white/5 h-full flex flex-col">
                  <div className="flex gap-1 text-yellow-500 mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-slate-300 italic mb-10 flex-grow leading-relaxed">
                    "{testi.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img src={testi.image} alt={testi.name} className="w-12 h-12 rounded-full object-cover border-2 border-sky-500" />
                    <div>
                      <h4 className="font-bold uppercase tracking-widest text-sm">{testi.name}</h4>
                      <span className="text-sky-500 text-xs font-medium">{testi.role}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Map / Location Section */}
      <section id="localizacao" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
             <div className="lg:col-span-2">
                <span className="text-sky-600 font-bold tracking-[0.4em] text-xs uppercase mb-4 block">Localização</span>
                <h2 className="text-4xl md:text-5xl text-luxury-gray uppercase leading-tight mb-8">
                  Onde Estamos <br />
                  <span className="font-light italic text-sky-600">em Maceió</span>
                </h2>
                <div className="space-y-6">
                   <div className="flex gap-4">
                      <div className="w-10 h-10 bg-soft-blue rounded-lg flex items-center justify-center text-sky-600 shrink-0">
                         <MapPin size={20} />
                      </div>
                      <div>
                         <h4 className="font-bold uppercase tracking-widest text-xs mb-1">Endereço Premium</h4>
                         <p className="text-sm text-slate-500">Av. Álvaro Otacílio, 1234 - Ponta Verde, Maceió - AL, 57035-180</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-10 h-10 bg-soft-blue rounded-lg flex items-center justify-center text-sky-600 shrink-0">
                         <Headset size={20} />
                      </div>
                      <div>
                         <h4 className="font-bold uppercase tracking-widest text-xs mb-1">Atendimento</h4>
                         <p className="text-sm text-slate-500">Segunda à Sexta, das 08:00 às 18:00. <br />Sábados das 09:00 às 13:00.</p>
                      </div>
                   </div>
                </div>
             </div>
             <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="w-full h-[450px] rounded-3xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 border-8 border-white"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15705.541243169305!2d-35.7071!3d-9.6644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x701459999999999%3A0x0!2sPonta%20Verde%2C%20Macei%C3%B3%20-%20AL!5e0!3m2!1spt-BR!2sbr!4v1652700000000!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </motion.div>
             </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contato" className="py-32 px-6 bg-ice">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sky-600 font-bold tracking-[0.4em] text-xs uppercase mb-4 block">Contato</span>
            <h2 className="text-4xl md:text-5xl text-luxury-gray uppercase mb-4">Envie Sua Mensagem</h2>
            <p className="text-slate-500 uppercase tracking-widest text-xs">Agende uma visita ou tire suas dúvidas agora mesmo.</p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-10 rounded-3xl shadow-xl space-y-6"
            onSubmit={(e) => { e.preventDefault(); alert('Mensagem enviada com sucesso!'); }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-luxury-gray uppercase tracking-widest">Nome Completo</label>
                <input required type="text" placeholder="Seu nome" className="w-full px-4 py-4 bg-white rounded-xl outline-none focus:ring-2 focus:ring-sky-500 transition-all border border-slate-100" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-luxury-gray uppercase tracking-widest">E-mail Corporativo</label>
                <input required type="email" placeholder="nome@email.com" className="w-full px-4 py-4 bg-white rounded-xl outline-none focus:ring-2 focus:ring-sky-500 transition-all border border-slate-100" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-luxury-gray uppercase tracking-widest">Telefone / WhatsApp</label>
              <input required type="tel" placeholder="(82) 99999-9999" className="w-full px-4 py-4 bg-white rounded-xl outline-none focus:ring-2 focus:ring-sky-500 transition-all border border-slate-100" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-luxury-gray uppercase tracking-widest">Mensagem</label>
              <textarea required rows={4} placeholder="Como podemos ajudar?" className="w-full px-4 py-4 bg-white rounded-xl outline-none focus:ring-2 focus:ring-sky-500 transition-all border border-slate-100 resize-none"></textarea>
            </div>
            <button type="submit" className="btn-premium w-full flex items-center justify-center gap-2 uppercase tracking-[0.3em] py-5 cursor-pointer">
              Enviar Solicitação Expressa
            </button>
          </motion.form>
        </div>
      </section>
    </div>
    </APIProvider>
  );
};

export default Home;
