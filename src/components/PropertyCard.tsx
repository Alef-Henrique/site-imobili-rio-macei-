import { motion } from 'motion/react';
import { Bed, Bath, Car, Maximize, MapPin } from 'lucide-react';
import { Property } from '../data/mockData';

interface PropertyCardProps {
  property: Property;
  index: number;
  key?: number | string;
}

const PropertyCard = ({ property, index }: PropertyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-700"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-6 left-6 flex flex-col gap-2">
            <div className="bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-bold text-slate-800 tracking-widest shadow-sm">
                {property.type === 'house' ? 'HOUSE' : 'APARTMENT'}
            </div>
            {property.featured && (
                <div className="bg-sky-600 px-4 py-1 rounded-full text-[10px] font-bold text-white tracking-widest shadow-lg">
                    EXCLUSIVE
                </div>
            )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
            <button className="btn-premium w-full text-[10px]">
                VIEW DETAILS
            </button>
        </div>
      </div>

      <div className="p-8">
        <div className="mb-4">
          <span className="text-sky-600 text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block">{property.location}</span>
          <h3 className="text-2xl font-display font-medium text-slate-900 group-hover:text-sky-600 transition-colors leading-tight">
            {property.name}
          </h3>
        </div>

        <div className="flex items-center gap-6 mb-6 text-slate-400">
          <div className="flex items-center gap-1.5">
            <Bed size={16} />
            <span className="text-xs font-medium">{property.beds}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Car size={16} />
            <span className="text-xs font-medium">{property.garage}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize size={16} />
            <span className="text-xs font-medium">{property.area}m²</span>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xl font-bold text-slate-900">
            R$ {property.price.toLocaleString('pt-BR')}
          </div>
          <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
