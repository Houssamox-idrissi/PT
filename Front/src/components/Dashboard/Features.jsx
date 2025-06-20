import { motion } from 'framer-motion';
import { FiCheckCircle, FiHeadphones, FiCalendar } from 'react-icons/fi';

export default function Features() {
  const features = [
    {
      name: 'Biens Vérifiés',
      description: 'Toutes les annonces sont soigneusement vérifiées pour garantir la qualité.',
      icon: <FiCheckCircle className="h-6 w-6" />
    },
    {
      name: 'Support 24/7',
      description: 'Notre équipe est disponible à tout moment pour vous assister.',
      icon: <FiHeadphones className="h-6 w-6" />
    },
    {
      name: 'Réservation Facile',
      description: 'Un processus de réservation simple et sécurisé.',
      icon: <FiCalendar className="h-6 w-6" />
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:text-center mb-16"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Pourquoi Choisir Holi Square
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Des fonctionnalités premium pour un séjour parfait
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.name}
              variants={item}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="relative bg-white p-8 rounded-xl shadow-lg border border-gray-100 h-full transition-all duration-300 group-hover:shadow-xl">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-500 text-white mx-auto mb-6"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
                  {feature.name}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
