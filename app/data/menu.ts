const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=500&h=500&fit=crop&q=80`;

export const menuData = [
  {
    category: "Coffee",
    items: [
      {
        id: "c1",
        kh: "កាហ្វេទឹកដោះគោ",
        en: "Milk Coffee",
        zh: "牛奶咖啡",
        price: 10,
        image: "https://i.pinimg.com/736x/a2/e2/a1/a2e2a153a2fef3ae3ee3f7c991cf6f18.jpg"
      },
      {
        id: "c2",
        kh: "កាហ្វេទឹកកក",
        en: "Iced Coffee",
        zh: "冰咖啡",
        price: 1.00,
        image: "https://i.pinimg.com/736x/70/6a/f6/706af6ad38a69ac21f0e434643d942f5.jpg"
      },
      { id: "c3", 
        kh: "អាយកាពូឈីណូ", 
        en: "Iced Cappuccino", 
        zh: "冰卡布奇诺", 
        price: 1.25, 
        image: "https://i.pinimg.com/736x/ee/c7/47/eec747ea34ad9a90bdd652abb64f3c2d.jpg" 
      },
      { id: "c4", kh: "អាយឡាតេ", en: "Iced Latte", zh: "冰拿铁", price: 1.25, image: IMG("1517701550927-30cf4ba1dba5") }
    ]
  },
  {
    category: "Matcha Series",
    items: [
      { id: "m1", kh: "ម៉ាតឆាឡាតេ", en: "Matcha Latte", zh: "抹茶拿铁", price: 1.50, image: IMG("1515823662972-da6a2e4d3002") },
      { id: "m2", kh: "ម៉ាតឆាស្រ្តបឺរី", en: "Strawberry Matcha", zh: "草莓抹茶", price: 1.50, image: IMG("1536256263959-770b48d82b0a") },
      { id: "m3", kh: "ម៉ាតឆាប្ល៊ូបឺរី", en: "Blueberry Matcha", zh: "蓝莓抹茶", price: 1.50, image: IMG("1564890369478-c89ca6d9cde9") },
      { id: "m4", kh: "ម៉ាតឆាផាសិន", en: "Passion Fruit Matcha", zh: "百香果抹茶", price: 1.50, image: IMG("1515823662972-da6a2e4d3002") }
    ]
  },
  {
    category: "Tea Series",
    items: [
      { id: "t1", kh: "តែក្រូចឆ្មា", en: "Lemon Tea", zh: "柠檬茶", price: 1.00, image: IMG("1597481499750-3e6b22637e12") },
      { id: "t2", kh: "តែបៃតងទឹកដោះគោ", en: "Green Milk Tea", zh: "绿奶茶", price: 1.25, image: IMG("1576092768241-dec231879fc3") },
      { id: "t3", kh: "តែទឹកដោះគោ", en: "Milk Tea", zh: "奶茶", price: 1.25, image: IMG("1571934811356-5cc061b6821f") },
      { id: "t4", kh: "ប្រោនស៊ូហ្គឺ", en: "Brown Sugar Milk Tea", zh: "黑糖奶茶", price: 1.50, image: IMG("1558160074-4d7d8bdf4256") }
    ]
  },
  {
    category: "Milk Series",
    items: [
      { id: "ms1", kh: "ស្រ្តបឺរីទឹកដោះគោ", en: "Strawberry Milk", zh: "草莓牛奶", price: 1.25, image: IMG("1568901839119-631418a3910d") },
      { id: "ms2", kh: "ប្ល៊ូបឺរីទឹកដោះគោ", en: "Blueberry Milk", zh: "蓝莓牛奶", price: 1.25, image: IMG("1553530666-ba11a7da3888") },
      { id: "ms3", kh: "ផាសិនទឹកដោះគោ", en: "Passion Fruit Milk", zh: "百香果牛奶", price: 1.25, image: IMG("1638176066666-ffb2f013c7dd") },
      { id: "ms4", kh: "សូកូឡាទឹកដោះគោ", en: "Chocolate Milk", zh: "巧克力牛奶", price: 1.50, image: IMG("1572490122747-3968b75cc699") }
    ]
  },
  {
    category: "Soda Series",
    items: [
      { id: "s1", kh: "ផាសិនសូដា", en: "Passion Fruit Soda", zh: "百香果苏打", price: 1.25, image: IMG("1437418747212-8d9709afab22") },
      { id: "s2", kh: "ប្ល៊ូបឺរីសូដា", en: "Blueberry Soda", zh: "蓝莓苏打", price: 1.25, image: IMG("1600271886742-f049cd451bba") },
      { id: "s3", kh: "ស្រ្តបឺរីសូដា", en: "Strawberry Soda", zh: "草莓苏打", price: 1.25, image: IMG("1437418747212-8d9709afab22") }
    ]
  },
  {
    category: "Cream Series",
    items: [
      { id: "cr1", kh: "ផាសិនគ្រីម", en: "Passion Fruit Cream", zh: "百香果奶盖", price: 1.50, image: IMG("1505252585461-04db1eb84625") },
      { id: "cr2", kh: "ស្រ្តបឺរីគ្រីម", en: "Strawberry Cream", zh: "草莓奶盖", price: 1.50, image: IMG("1568901839119-631418a3910d") },
      { id: "cr3", kh: "ប្ល៊ូបឺរីគ្រីម", en: "Blueberry Cream", zh: "蓝莓奶盖", price: 1.50, image: IMG("1553530666-ba11a7da3888") }
    ]
  }
];
