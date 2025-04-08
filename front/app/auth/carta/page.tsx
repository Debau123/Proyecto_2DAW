"use client";

export default function CartaPage() {
  const menu = [
    {
      title: "Entrantes",
      items: [
        {
          name: "Carpaccio de ternera",
          description: "Finas láminas de ternera con aceite de trufa y parmesano.",
          price: "15€",
          allergens: ["Lácteos"],
          image: "https://source.unsplash.com/400x400/?beef",
        },
        {
          name: "Ensalada César",
          description: "Lechuga romana, pollo a la parrilla, crutones y aliño César.",
          price: "12€",
          allergens: ["Gluten", "Lácteos", "Huevo"],
          image: "https://source.unsplash.com/400x400/?salad",
        },
        {
          name: "Pulpo a la gallega",
          description: "Pulpo fresco con pimentón de la vera y aceite de oliva virgen extra.",
          price: "18€",
          allergens: ["Moluscos"],
          image: "https://source.unsplash.com/400x400/?octopus",
        },
      ],
    },
    {
      title: "Platos principales",
      items: [
        {
          name: "Solomillo al foie",
          description: "Solomillo de ternera con reducción de Pedro Ximénez y foie.",
          price: "28€",
          allergens: ["Lácteos"],
          image: "https://source.unsplash.com/400x400/?steak",
        },
        {
          name: "Lubina al horno",
          description: "Lubina fresca con patatas panaderas y salsa verde.",
          price: "22€",
          allergens: ["Pescado"],
          image: "https://source.unsplash.com/400x400/?fish",
        },
        {
          name: "Risotto de setas",
          description: "Risotto cremoso de setas con parmesano rallado.",
          price: "20€",
          allergens: ["Lácteos"],
          image: "https://source.unsplash.com/400x400/?risotto",
        },
      ],
    },
    {
      title: "Postres",
      items: [
        {
          name: "Tarta de queso",
          description: "Tarta de queso al horno con frutos rojos frescos.",
          price: "8€",
          allergens: ["Lácteos", "Gluten"],
          image: "https://source.unsplash.com/400x400/?cheesecake",
        },
        {
          name: "Mousse de chocolate",
          description: "Mousse de chocolate negro con virutas de cacao.",
          price: "7€",
          allergens: ["Cacao"],
          image: "https://source.unsplash.com/400x400/?chocolate",
        },
        {
          name: "Helados artesanales",
          description: "Surtido de helados artesanales de vainilla, chocolate y fresa.",
          price: "6€",
          allergens: ["Lácteos"],
          image: "https://source.unsplash.com/400x400/?icecream",
        },
      ],
    },
    {
      title: "Carta de vinos",
      items: [
        {
          name: "Vino Tinto Rioja Reserva",
          description: "Notas de frutos rojos y toques de madera.",
          price: "30€",
          image: "https://source.unsplash.com/400x400/?red-wine",
        },
        {
          name: "Vino Blanco Albariño",
          description: "Vino fresco y afrutado, perfecto para pescados.",
          price: "25€",
          image: "https://source.unsplash.com/400x400/?white-wine",
        },
        {
          name: "Champán Brut",
          description: "Burbujas finas y sabor seco, ideal para celebraciones.",
          price: "50€",
          image: "https://source.unsplash.com/400x400/?champagne",
        },
      ],
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">Nuestra Carta</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {menu.map((section) => (
          <div key={section.title} className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">{section.title}</h2>
            {section.items.map((item) => (
              <div
                key={item.name}
                className="flex flex-col items-center mb-8 transition-transform hover:scale-105"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-40 h-40 object-cover rounded-lg mb-4 shadow-md"
                />
                <h3 className="text-lg font-bold text-center">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-2 text-center">{item.description}</p>
                <p className="text-blue-500 font-semibold mb-2">{item.price}</p>
                {"allergens" in item && item.allergens && (
                  <p className="text-sm text-red-500">
                    Alérgenos: {item.allergens.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
