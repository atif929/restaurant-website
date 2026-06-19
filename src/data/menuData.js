export const menuItems = [
  // ============ STARTERS ============
  {
    id: 1,
    name: 'Bruschetta',
    category: 'Starters',
    description: 'Toasted bread topped with fresh tomatoes, garlic, basil, and extra virgin olive oil.',
    price: 8.99,
    image: '/images/starters/bruschetta.jpg'
  },
  {
    id: 2,
    name: 'Calamari Fritti',
    category: 'Starters',
    description: 'Crispy fried calamari served with marinara sauce and lemon wedges.',
    price: 10.99,
    image: '/images/starters/calamari.jpg'
  },
  {
    id: 3,
    name: 'Stuffed Mushrooms',
    category: 'Starters',
    description: 'Mushrooms stuffed with a savory blend of herbs, cheese, and breadcrumbs.',
    price: 9.49,
    image: '/images/starters/stuffed-mushrooms.jpg'
  },
  {
    id: 4,
    name: 'Garlic Bread',
    category: 'Starters',
    description: 'Freshly baked bread with garlic butter, herbs, and melted mozzarella.',
    price: 6.99,
    image: '/images/starters/garlic-bread.jpg'
  },

  // ============ MAIN COURSE ============
  {
    id: 5,
    name: 'Grilled Salmon',
    category: 'Main Course',
    description: 'Perfectly grilled Atlantic salmon with lemon butter sauce and seasonal vegetables.',
    price: 24.99,
    image: '/images/main-course/grilled-salmon.jpg'
  },
  {
    id: 6,
    name: 'Ribeye Steak',
    category: 'Main Course',
    description: 'Prime ribeye steak cooked to perfection, served with garlic mashed potatoes.',
    price: 32.99,
    image: '/images/main-course/ribeye-steak.jpg'
  },
  {
    id: 7,
    name: 'Chicken Alfredo',
    category: 'Main Course',
    description: 'Grilled chicken breast over fettuccine with creamy Alfredo sauce and parmesan.',
    price: 18.99,
    image: '/images/main-course/chicken-alfredo.jpg'
  },
  {
    id: 8,
    name: 'Vegetable Risotto',
    category: 'Main Course',
    description: 'Creamy Arborio rice with seasonal vegetables, white wine, and parmesan cheese.',
    price: 16.99,
    image: '/images/main-course/vegetable-risotto.jpg'
  },

  // ============ DESSERTS ============
  {
    id: 9,
    name: 'Tiramisu',
    category: 'Desserts',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream.',
    price: 7.99,
    image: '/images/desserts/tiramisu.jpg'
  },
  {
    id: 10,
    name: 'Chocolate Lava Cake',
    category: 'Desserts',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
    price: 8.99,
    image: '/images/desserts/chocolate-lava.jpg'
  },
  {
    id: 11,
    name: 'Crème Brûlée',
    category: 'Desserts',
    description: 'Rich vanilla custard with a perfectly caramelized sugar crust.',
    price: 7.49,
    image: '/images/desserts/creme-brulee.jpg'
  },
  {
    id: 12,
    name: 'Panna Cotta',
    category: 'Desserts',
    description: 'Silky Italian custard with fresh berry compote and mint garnish.',
    price: 6.99,
    image: '/images/desserts/panna-cotta.jpg'
  },

  // ============ DRINKS ============
  {
    id: 13,
    name: 'Fresh Lemonade',
    category: 'Drinks',
    description: 'Hand-squeezed lemonade with fresh mint and a hint of honey.',
    price: 4.99,
    image: '/images/drinks/lemonade.jpg'
  },
  {
    id: 14,
    name: 'Espresso Martini',
    category: 'Drinks',
    description: 'Bold espresso, vodka, and coffee liqueur shaken to perfection.',
    price: 12.99,
    image: '/images/drinks/espresso-martini.jpg'
  },
  {
    id: 15,
    name: 'Mocktail Mojito',
    category: 'Drinks',
    description: 'Refreshing mix of mint, lime, soda water, and fresh berries.',
    price: 6.99,
    image: '/images/drinks/mocktail-mojito.jpg'
  },
  {
    id: 16,
    name: 'Wine Selection',
    category: 'Drinks',
    description: 'Carefully curated selection of fine wines from around the world.',
    price: 9.99,
    image: '/images/drinks/wine-selection.jpg'
  }
];

export const categories = [
  { id: 'starters', label: 'Starters', value: 'Starters' },
  { id: 'main-course', label: 'Main Course', value: 'Main Course' },
  { id: 'desserts', label: 'Desserts', value: 'Desserts' },
  { id: 'drinks', label: 'Drinks', value: 'Drinks' }
];