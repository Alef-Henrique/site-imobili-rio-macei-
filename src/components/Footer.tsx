import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-sky-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                M
              </div>
              <span className="text-lg font-bold tracking-tight uppercase whitespace-nowrap text-white">
                MACEIÓ<span className="font-light text-sky-500">PRIME</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              A imobiliária líder em imóveis de alto padrão e luxo em Maceió. Nossa missão é realizar sonhos com transparência, sofisticação e excelência.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-500 transition-all"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Links Rápidos</h4>
            <ul className="space-y-4">
              {['Início', 'Casas', 'Apartamentos', 'Sobre Nós', 'Blog', 'Carreiras'].map((link) => (
                <li key={link}>
                  <Link to="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-sky-500 shrink-0" size={20} />
                <span className="text-slate-400 text-sm">Av. Álvaro Otacílio, 1234 - Ponta Verde, Maceió - AL</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-sky-500 shrink-0" size={20} />
                <span className="text-slate-400 text-sm">(82) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-sky-500 shrink-0" size={20} />
                <span className="text-slate-400 text-sm">contato@maceioprime.com.br</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-4">Receba ofertas exclusivas e novidades do mercado imobiliário.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="bg-slate-800 border-none rounded-l-lg py-2 px-4 text-sm focus:ring-1 focus:ring-sky-500 w-full outline-none"
              />
              <button className="bg-sky-600 hover:bg-sky-500 px-4 rounded-r-lg transition-colors">
                Assinar
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs text-center md:text-left">
            © 2026 Maceió Prime. Todos os direitos reservados. 
            <br className="md:hidden" /> Desenvolvido com sofisticação.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-slate-500 text-xs hover:text-white">Termos de Uso</Link>
            <Link to="#" className="text-slate-500 text-xs hover:text-white">Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
