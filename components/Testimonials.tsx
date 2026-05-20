import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialsProps {
  onBecomeClient: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onBecomeClient }) => {
  const reviews = [
    {
      id: 1,
      name: "Александр В.",
      product: "Ремень 'Генерал'",
      text: "Качество просто космос. Кожа толстая, пахнет настоящим ремеслом. Ношу уже полгода, стал только красивее. Отдельное спасибо за упаковку!",
      rating: 5,
      date: "12 октября 2023"
    },
    {
      id: 2,
      name: "Елена С.",
      product: "Сумка-тоут",
      text: "Заказывала мужу в подарок. Он в восторге! Очень переживала за цвет, но мастер прислал фото кожи перед пошивом. Сервис на высоте.",
      rating: 5,
      date: "05 сентября 2023"
    },
    {
      id: 3,
      name: "Дмитрий К.",
      product: "Картхолдер 'Слим'",
      text: "Искал именно такой минимализм. Ничего лишнего, швы идеальные, в кармане не чувствуется. Рекомендую всем, кто ценит ручную работу.",
      rating: 5,
      date: "20 ноября 2023"
    }
  ];

  return (
    <section className="py-24 bg-leather-50 border-t border-leather-200">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-leather-900 mb-4">Отзывы</h2>
          <p className="text-leather-600 max-w-xl mx-auto">
            Лучшая награда для мастера — это вещи, которые служат годами.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-sm shadow-sm hover:shadow-lg transition-shadow duration-300 relative border border-leather-200 flex flex-col h-full">
              <div className="absolute top-6 right-8 text-leather-200">
                <Quote size={48} className="transform rotate-180" />
              </div>
              
              <div className="flex gap-1 mb-4 text-yellow-500">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              <p className="text-leather-800 leading-relaxed mb-6 flex-grow italic">
                "{review.text}"
              </p>

              <div className="mt-auto pt-6 border-t border-leather-200">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="font-serif text-leather-900 font-bold text-lg">{review.name}</p>
                        <p className="text-xs text-leather-500 uppercase tracking-wider mt-1">{review.product}</p>
                    </div>
                    <span className="text-xs text-leather-400">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
           <button 
              onClick={onBecomeClient}
              className="inline-block text-leather-600 border-b border-leather-400 pb-1 text-sm font-bold uppercase tracking-widest hover:text-leather-900 hover:border-leather-900 transition-colors"
           >
              Стать клиентом
           </button>
        </div>
      </div>
    </section>
  );
};