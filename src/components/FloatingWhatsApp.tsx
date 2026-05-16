import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
  return (
    <motion.a
      href="https://wa.me/5582999999999"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-[0_8px_30px_rgb(34,197,94,0.4)] transition-all"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <MessageCircle size={32} />
      </motion.div>
      <div className="absolute -top-2 -right-2 bg-red-500 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold">
        1
      </div>
    </motion.a>
  );
};

export default FloatingWhatsApp;
