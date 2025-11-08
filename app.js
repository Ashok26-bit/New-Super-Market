/*
  New Saravana Super Market Front-end
  -----------------------------------
  Static dataset + in-memory store powering catalogue, cart,
  admin CRUD, and dashboard views.
*/

const cloneDeep = (value) => JSON.parse(JSON.stringify(value));

const randomId = () => {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
};

const createSlug = (value, prefix) => {
    const base = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    return `${prefix}-${base}-${randomId().slice(0, 8)}`;
};

const initialData = {
    meta: {
        store: "New Saravana Super Market",
        location: "Samayapuram",
        currency: "INR",
    },
    categories: [
        {
            id: "grocery",
            name: "Grocery",
            description: "Essential staples, pulses, rice, and everyday ingredients.",
            accent: "linear-gradient(135deg, rgba(255, 173, 92, 0.8), rgba(248, 120, 58, 0.6))",
        },
        {
            id: "fruits",
            name: "Fruits",
            description: "Seasonal and exotic fruits sourced fresh each morning.",
            accent: "linear-gradient(135deg, rgba(255, 206, 115, 0.7), rgba(253, 137, 117, 0.5))",
        },
        {
            id: "vegetables",
            name: "Vegetables",
            description: "Farm-fresh greens, roots, and everyday vegetables.",
            accent: "linear-gradient(135deg, rgba(146, 220, 174, 0.75), rgba(90, 197, 139, 0.55))",
        },
        {
            id: "snacks",
            name: "Snacks",
            description: "Crunchy munchies, biscuits, instant bites, and more.",
            accent: "linear-gradient(135deg, rgba(255, 190, 140, 0.75), rgba(246, 109, 155, 0.6))",
        },
        {
            id: "beverages",
            name: "Beverages",
            description: "Juices, soft drinks, energisers, teas, and coffees.",
            accent: "linear-gradient(135deg, rgba(141, 210, 245, 0.75), rgba(138, 187, 233, 0.55))",
        },
        {
            id: "bakery",
            name: "Bakery",
            description: "Fresh breads, buns, pastries, and traditional treats.",
            accent: "linear-gradient(135deg, rgba(255, 199, 170, 0.7), rgba(223, 135, 96, 0.55))",
        },
        {
            id: "dairy",
            name: "Dairy & Eggs",
            description: "Milk, paneer, curd, cheese, butter, and farm eggs.",
            accent: "linear-gradient(135deg, rgba(255, 227, 167, 0.72), rgba(252, 199, 103, 0.55))",
        },
        {
            id: "personal-care",
            name: "Personal Care",
            description: "Hygiene essentials, skincare, haircare, and wellness.",
            accent: "linear-gradient(135deg, rgba(220, 199, 255, 0.7), rgba(148, 163, 255, 0.6))",
        },
        {
            id: "household",
            name: "Household",
            description: "Home care, cleaning supplies, utensils, and storage.",
            accent: "linear-gradient(135deg, rgba(142, 223, 209, 0.7), rgba(114, 201, 199, 0.55))",
        },
        {
            id: "frozen",
            name: "Frozen & Ready",
            description: "Ready-to-cook parathas, cut veggies, and desserts.",
            accent: "linear-gradient(135deg, rgba(171, 205, 255, 0.75), rgba(118, 169, 244, 0.55))",
        },
    ],
    products: [
        {
            id: "prd-royal-basmati",
            name: "Royal Basmati Rice",
            category: "grocery",
            price: 899,
            unit: "5 kg pack",
            stock: 48,
            availability: "in-stock",
            brand: "Daawat",
            rating: 4.7,
            tags: ["staples", "premium", "bulk"],
            image: "https://images.unsplash.com/photo-1586201375761-83865001e31b?auto=format&fit=crop&w=600&q=60",
            description: "Aged basmati with a delicate aroma, perfect for biryanis and festive meals.",
            featured: true,
        },
        {
            id: "prd-idly-rice",
            name: "Idly Rice",
            category: "grocery",
            price: 72,
            unit: "1 kg pack",
            stock: 36,
            availability: "in-stock",
            brand: "Saravana Select",
            rating: 4.5,
            tags: ["staples", "south-indian"],
            image: "https://images.unsplash.com/photo-1604908177522-4023ac76c54a?auto=format&fit=crop&w=600&q=60",
            description: "Polished rice milled for soft, fluffy idlis and crispy dosas every morning.",
            featured: false,
        },
        {
            id: "prd-urd-dal",
            name: "Organic Urad Dal",
            category: "grocery",
            price: 155,
            unit: "1 kg pack",
            stock: 24,
            availability: "low-stock",
            brand: "24 Mantra",
            rating: 4.6,
            tags: ["organic", "protein"],
            image: "https://images.unsplash.com/photo-1528669826291-1e8a5c1b73b1?auto=format&fit=crop&w=600&q=60",
            description: "Certified organic split urad dal ideal for batters, gravies, and tadkas.",
            featured: false,
        },
        {
            id: "prd-alphonso-mango",
            name: "Alphonso Mango",
            category: "fruits",
            price: 299,
            unit: "1 kg (approx. 3 pcs)",
            stock: 18,
            availability: "low-stock",
            brand: "Ratnagiri Farms",
            rating: 4.9,
            tags: ["seasonal", "premium", "sweet"],
            image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=60",
            description: "Handpicked GI-tagged Alphonsos with rich saffron pulp and aroma.",
            featured: true,
        },
        {
            id: "prd-green-grapes",
            name: "Seedless Green Grapes",
            category: "fruits",
            price: 85,
            unit: "500 g",
            stock: 60,
            availability: "in-stock",
            brand: "Nashik Fresh",
            rating: 4.4,
            tags: ["fresh", "vitamin-c"],
            image: "https://images.unsplash.com/photo-1464961968964-a80a9b51f3e5?auto=format&fit=crop&w=600&q=60",
            description: "Crisp, sweet grapes washed and ready to serve for healthy snacking.",
            featured: false,
        },
        {
            id: "prd-curry-leaf",
            name: "Heritage Curry Leaves",
            category: "vegetables",
            price: 22,
            unit: "1 bunch",
            stock: 12,
            availability: "low-stock",
            brand: "Farmer's Co-Op",
            rating: 4.8,
            tags: ["aromatics", "fresh"],
            image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=60",
            description: "Fragrant curry leaves sourced locally each dawn to retain essential oils.",
            featured: false,
        },
        {
            id: "prd-hybrid-tomato",
            name: "Hybrid Tomatoes",
            category: "vegetables",
            price: 38,
            unit: "1 kg",
            stock: 94,
            availability: "in-stock",
            brand: "Samayapuram Collective",
            rating: 4.3,
            tags: ["fresh", "cooking"],
            image: "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?auto=format&fit=crop&w=600&q=60",
            description: "Juicy, bright red tomatoes perfect for gravies, salads, and chutneys.",
            featured: false,
        },
        {
            id: "prd-english-cucumber",
            name: "English Cucumbers",
            category: "vegetables",
            price: 45,
            unit: "500 g",
            stock: 42,
            availability: "in-stock",
            brand: "Hydro Greens",
            rating: 4.5,
            tags: ["hydrating", "salads"],
            image: "https://images.unsplash.com/photo-1587486913043-6a18fc761ec8?auto=format&fit=crop&w=600&q=60",
            description: "Hydroponically grown cucumbers—crisp, sweet, and low in calories.",
            featured: false,
        },
        {
            id: "prd-murukku",
            name: "Chettinad Butter Murukku",
            category: "snacks",
            price: 110,
            unit: "250 g",
            stock: 32,
            availability: "in-stock",
            brand: "Aachi Kitchen",
            rating: 4.6,
            tags: ["traditional", "crispy"],
            image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=600&q=60",
            description: "Authentic ring murukku made with roasted gram, butter, and curry leaves.",
            featured: true,
        },
        {
            id: "prd-millet-chips",
            name: "Millet Mix Chips",
            category: "snacks",
            price: 65,
            unit: "120 g",
            stock: 55,
            availability: "in-stock",
            brand: "Too Yumm",
            rating: 4.2,
            tags: ["baked", "healthy"],
            image: "https://images.unsplash.com/photo-1568051243853-66b23c7b2590?auto=format&fit=crop&w=600&q=60",
            description: "Crisp baked chips featuring ragi, jowar, and bajra for guilt-free snacking.",
            featured: false,
        },
        {
            id: "prd-filter-coffee",
            name: "Kumbakonam Filter Coffee Decoction",
            category: "beverages",
            price: 175,
            unit: "500 ml",
            stock: 28,
            availability: "in-stock",
            brand: "Leo",
            rating: 4.8,
            tags: ["south-indian", "aromatic"],
            image: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=600&q=60",
            description: "90:10 blend decoction brewed slow with chicory for instant filter coffees.",
            featured: false,
        },
        {
            id: "prd-cold-pressed-juice",
            name: "Cold-Pressed Detox Juice",
            category: "beverages",
            price: 120,
            unit: "300 ml",
            stock: 16,
            availability: "low-stock",
            brand: "Raw Pressery",
            rating: 4.4,
            tags: ["detox", "vegan"],
            image: "https://images.unsplash.com/photo-1513558161293-89e675f2a1a2?auto=format&fit=crop&w=600&q=60",
            description: "Kale, spinach, apple, and ginger blend to keep you energised through the day.",
            featured: false,
        },
        {
            id: "prd-multigrain-bread",
            name: "Multigrain Artisan Bread",
            category: "bakery",
            price: 95,
            unit: "400 g loaf",
            stock: 15,
            availability: "low-stock",
            brand: "Ovenly",
            rating: 4.7,
            tags: ["fresh-baked", "high-fibre"],
            image: "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=600&q=60",
            description: "Baked daily with seven grains, sunflower seeds, and natural sourdough starter.",
            featured: true,
        },
        {
            id: "prd-butter-croissant",
            name: "Butter Croissant",
            category: "bakery",
            price: 55,
            unit: "1 piece",
            stock: 40,
            availability: "in-stock",
            brand: "La Patisserie",
            rating: 4.5,
            tags: ["buttery", "light"],
            image: "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=600&q=60",
            description: "Flaky laminated croissant baked with European butter and dusted lightly.",
            featured: false,
        },
        {
            id: "prd-farm-milk",
            name: "A2 Desi Cow Milk",
            category: "dairy",
            price: 68,
            unit: "1 litre",
            stock: 52,
            availability: "in-stock",
            brand: "Samayapuram Diary",
            rating: 4.9,
            tags: ["fresh", "a2", "daily"],
            image: "https://images.unsplash.com/photo-1532635241-17e820acc59c?auto=format&fit=crop&w=600&q=60",
            description: "Unadulterated farm-fresh milk from grass-fed native cows delivered chilled.",
            featured: true,
        },
        {
            id: "prd-paneer",
            name: "Premium Malai Paneer",
            category: "dairy",
            price: 125,
            unit: "200 g",
            stock: 34,
            availability: "in-stock",
            brand: "Amul",
            rating: 4.6,
            tags: ["protein", "soft"],
            image: "https://images.unsplash.com/photo-1608500219613-1b1d8c6b134b?auto=format&fit=crop&w=600&q=60",
            description: "Soft malai paneer with a melt-in-mouth texture perfect for curries.",
            featured: false,
        },
        {
            id: "prd-lavender-soap",
            name: "Lavender Goat Milk Soap",
            category: "personal-care",
            price: 145,
            unit: "100 g bar",
            stock: 20,
            availability: "low-stock",
            brand: "Soulflower",
            rating: 4.7,
            tags: ["handmade", "aromatherapy"],
            image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=60",
            description: "Cold-processed soap with lavender extracts and nourishing goat milk.",
            featured: false,
        },
        {
            id: "prd-herbal-toothpaste",
            name: "Herbal Toothpaste",
            category: "personal-care",
            price: 89,
            unit: "150 g",
            stock: 64,
            availability: "in-stock",
            brand: "Dabur",
            rating: 4.2,
            tags: ["ayurvedic", "family"],
            image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267b9?auto=format&fit=crop&w=600&q=60",
            description: "Ayurvedic formula with clove, neem, and miswak for complete oral care.",
            featured: false,
        },
        {
            id: "prd-dishwash-gel",
            name: "Lemon Dishwash Gel",
            category: "household",
            price: 96,
            unit: "750 ml",
            stock: 70,
            availability: "in-stock",
            brand: "Pril",
            rating: 4.4,
            tags: ["cleaning", "degrease"],
            image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=60",
            description: "Powerful grease-fighting formula with natural lemon extracts.",
            featured: false,
        },
        {
            id: "prd-bamboo-wipes",
            name: "Reusable Bamboo Wipes",
            category: "household",
            price: 210,
            unit: "Pack of 6",
            stock: 10,
            availability: "low-stock",
            brand: "EcoSoul",
            rating: 4.5,
            tags: ["sustainable", "reusable"],
            image: "https://images.unsplash.com/photo-1629904853716-e3c0c74b9075?auto=format&fit=crop&w=600&q=60",
            description: "Ultra-absorbent bamboo fiber cloths for repeat-use cleaning chores.",
            featured: false,
        },
        {
            id: "prd-frozen-parotta",
            name: "Malabar Parotta Family Pack",
            category: "frozen",
            price: 145,
            unit: "10 pieces",
            stock: 22,
            availability: "in-stock",
            brand: "ID Fresh",
            rating: 4.6,
            tags: ["ready-to-cook", "flaky"],
            image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=60",
            description: "Layered parottas made with wholesome ingredients, ready in minutes.",
            featured: true,
        },
        {
            id: "prd-frozen-peas",
            name: "Garden Fresh Green Peas",
            category: "frozen",
            price: 115,
            unit: "500 g",
            stock: 44,
            availability: "in-stock",
            brand: "Safal",
            rating: 4.5,
            tags: ["frozen", "vitamin-rich"],
            image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=60",
            description: "Individually quick frozen peas that retain colour, sweetness, and crunch.",
            featured: false,
        },
        {
            id: "prd-trail-mix",
            name: "Nutty Trail Mix",
            category: "snacks",
            price: 210,
            unit: "200 g",
            stock: 18,
            availability: "low-stock",
            brand: "True Elements",
            rating: 4.3,
            tags: ["protein", "superfood"],
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=60",
            description: "Roasted nuts, berries, pumpkin seeds, and jaggery clusters for energy.",
            featured: false,
        },
        {
            id: "prd-coconut-water",
            name: "Tender Coconut Water",
            category: "beverages",
            price: 49,
            unit: "200 ml",
            stock: 88,
            availability: "in-stock",
            brand: "Paper Boat",
            rating: 4.2,
            tags: ["hydrating", "natural"],
            image: "https://images.unsplash.com/photo-1502741126161-b048400d2047?auto=format&fit=crop&w=600&q=60",
            description: "Electrolyte-rich coconut water sourced from coastal Tamil Nadu farms.",
            featured: false,
        },
        {
            id: "prd-brown-egg",
            name: "Free Range Brown Eggs",
            category: "dairy",
            price: 92,
            unit: "Pack of 6",
            stock: 30,
            availability: "in-stock",
            brand: "Happy Hens",
            rating: 4.6,
            tags: ["protein", "farm-fresh"],
            image: "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=600&q=60",
            description: "Cage-free eggs rich in omega-3 and vitamin D, collected the same day.",
            featured: false,
        },
    ],
    offers: [
        {
            id: "offer-festive-combo",
            title: "Festive Essentials Combo",
            description: "Save 12% on rice, dals, ghee, and masalas when you bundle staples.",
            tags: ["festival", "combo"],
            category: "grocery",
            validUntil: "2025-12-31",
            discountType: "percentage",
            discountValue: 12,
        },
        {
            id: "offer-fruit-basket",
            title: "Seasonal Fruit Basket",
            description: "Get a curated fruit basket at ₹699 including mangoes, grapes, and berries.",
            tags: ["seasonal", "limited"],
            category: "fruits",
            validUntil: "2025-05-31",
            discountType: "flat",
            discountValue: 100,
        },
        {
            id: "offer-morning-beverages",
            title: "Morning Beverage Boost",
            description: "Buy two beverages and get the third at 50% off across teas and coffees.",
            tags: ["bogo", "beverages"],
            category: "beverages",
            validUntil: "2025-08-15",
            discountType: "percentage",
            discountValue: 50,
        },
        {
            id: "offer-clean-living",
            title: "Clean Living Kit",
            description: "Household + personal care bundle at flat ₹199 off for eco-friendly choices.",
            tags: ["eco-friendly", "bundle"],
            category: "household",
            validUntil: "2025-09-30",
            discountType: "flat",
            discountValue: 199,
        },
    ],
    sales: [
        {
            year: 2024,
            months: [
                { month: "Jan", revenue: 315000, orders: 1180, growth: 7, breakdown: { grocery: 78000, fruits: 29000, vegetables: 41000, snacks: 36000, beverages: 32000, bakery: 28000, dairy: 39000, personal: 21000, household: 18000, frozen: 14000 } },
                { month: "Feb", revenue: 332000, orders: 1255, growth: 5, breakdown: { grocery: 82000, fruits: 32000, vegetables: 43000, snacks: 37000, beverages: 33000, bakery: 30000, dairy: 42000, personal: 21500, household: 19500, frozen: 15500 } },
                { month: "Mar", revenue: 348500, orders: 1310, growth: 6, breakdown: { grocery: 86500, fruits: 33500, vegetables: 44500, snacks: 39200, beverages: 34800, bakery: 31800, dairy: 43800, personal: 22200, household: 20400, frozen: 17000 } },
                { month: "Apr", revenue: 362400, orders: 1385, growth: 8, breakdown: { grocery: 91000, fruits: 36000, vegetables: 46600, snacks: 40200, beverages: 35800, bakery: 32900, dairy: 45000, personal: 23000, household: 21200, frozen: 17800 } },
                { month: "May", revenue: 381000, orders: 1440, growth: 10, breakdown: { grocery: 95800, fruits: 42000, vegetables: 48000, snacks: 41800, beverages: 37200, bakery: 34400, dairy: 46600, personal: 23600, household: 22100, frozen: 17500 } },
                { month: "Jun", revenue: 399200, orders: 1510, growth: 9, breakdown: { grocery: 100400, fruits: 43800, vegetables: 49800, snacks: 43000, beverages: 38400, bakery: 35600, dairy: 48200, personal: 24000, household: 23200, frozen: 18000 } },
                { month: "Jul", revenue: 412600, orders: 1555, growth: 6, breakdown: { grocery: 103200, fruits: 45500, vegetables: 51200, snacks: 44100, beverages: 39800, bakery: 36500, dairy: 49200, personal: 24800, household: 24000, frozen: 19300 } },
                { month: "Aug", revenue: 428900, orders: 1610, growth: 7, breakdown: { grocery: 106800, fruits: 46800, vegetables: 52600, snacks: 45600, beverages: 41200, bakery: 37800, dairy: 50800, personal: 25400, household: 24600, frozen: 19100 } },
                { month: "Sep", revenue: 440300, orders: 1665, growth: 5, breakdown: { grocery: 108400, fruits: 47200, vegetables: 53800, snacks: 46600, beverages: 42600, bakery: 38800, dairy: 52000, personal: 26200, household: 25000, frozen: 19200 } },
                { month: "Oct", revenue: 468500, orders: 1750, growth: 9, breakdown: { grocery: 116200, fruits: 50800, vegetables: 56000, snacks: 49800, beverages: 44800, bakery: 40200, dairy: 54200, personal: 27400, household: 26600, frozen: 20400 } },
                { month: "Nov", revenue: 489900, orders: 1820, growth: 7, breakdown: { grocery: 121000, fruits: 52800, vegetables: 58000, snacks: 51400, beverages: 46800, bakery: 41400, dairy: 56000, personal: 28600, household: 27600, frozen: 22200 } },
                { month: "Dec", revenue: 505400, orders: 1895, growth: 6, breakdown: { grocery: 125200, fruits: 54000, vegetables: 59800, snacks: 52800, beverages: 48600, bakery: 42800, dairy: 57800, personal: 29400, household: 28400, frozen: 22500 } },
            ],
        },
        {
            year: 2025,
            months: [
                { month: "Jan", revenue: 522800, orders: 1920, growth: 5, breakdown: { grocery: 129400, fruits: 55200, vegetables: 61200, snacks: 53800, beverages: 49600, bakery: 43900, dairy: 59200, personal: 30200, household: 29200, frozen: 23100 } },
                { month: "Feb", revenue: 534600, orders: 1955, growth: 4, breakdown: { grocery: 132200, fruits: 56000, vegetables: 62400, snacks: 54800, beverages: 50400, bakery: 44600, dairy: 60400, personal: 30800, household: 29700, frozen: 23200 } },
                { month: "Mar", revenue: 551900, orders: 2010, growth: 5, breakdown: { grocery: 135800, fruits: 57600, vegetables: 63900, snacks: 56200, beverages: 51600, bakery: 45800, dairy: 62000, personal: 31600, household: 30200, frozen: 23800 } },
                { month: "Apr", revenue: 569300, orders: 2080, growth: 6, breakdown: { grocery: 140200, fruits: 59400, vegetables: 65600, snacks: 57800, beverages: 52800, bakery: 47200, dairy: 63600, personal: 32600, household: 31000, frozen: 24200 } },
                { month: "May", revenue: 588500, orders: 2145, growth: 7, breakdown: { grocery: 145600, fruits: 61800, vegetables: 67400, snacks: 59200, beverages: 54200, bakery: 48600, dairy: 65400, personal: 33600, household: 31800, frozen: 24800 } },
                { month: "Jun", revenue: 604200, orders: 2205, growth: 5, breakdown: { grocery: 149800, fruits: 63000, vegetables: 68800, snacks: 60600, beverages: 55600, bakery: 49800, dairy: 67000, personal: 34400, household: 32600, frozen: 25500 } },
                { month: "Jul", revenue: 619800, orders: 2260, growth: 4, breakdown: { grocery: 153600, fruits: 64200, vegetables: 70200, snacks: 61800, beverages: 56800, bakery: 50800, dairy: 68400, personal: 35200, household: 33400, frozen: 26200 } },
                { month: "Aug", revenue: 636400, orders: 2330, growth: 5, breakdown: { grocery: 157200, fruits: 65600, vegetables: 71800, snacks: 63200, beverages: 58200, bakery: 52200, dairy: 70000, personal: 36000, household: 34200, frozen: 26300 } },
            ],
        },
    ],
};

const createStore = (initialState) => {
    const state = cloneDeep(initialState);
    const listeners = {
        products: new Set(),
        categories: new Set(),
        offers: new Set(),
        sales: new Set(),
        meta: new Set(),
    };

    const notify = (key) => {
        const snapshot = key === "meta" ? { ...state.meta } : cloneDeep(state[key]);
        listeners[key].forEach((cb) => cb(snapshot));
    };

    const nextId = {
        product: () => createSlug(`prd-${state.products.length + 1}`, "prd"),
        category: () => createSlug(`cat-${state.categories.length + 1}`, "cat"),
        offer: () => createSlug(`offer-${state.offers.length + 1}`, "offer"),
    };

    const ensureCategory = (categoryId) => {
        const exists = state.categories.some((cat) => cat.id === categoryId);
        if (!exists) {
            throw new Error(`Category ${categoryId} not found`);
        }
    };

    return {
        getState: () => cloneDeep(state),
        getProducts: () => cloneDeep(state.products),
        getCategories: () => cloneDeep(state.categories),
        getOffers: () => cloneDeep(state.offers),
        getSales: () => cloneDeep(state.sales),
        getMeta: () => ({ ...state.meta }),

        addProduct: (product) => {
            ensureCategory(product.category);
            const id = product.id || nextId.product();
            state.products.push({
                description: "",
                tags: [],
                rating: 4.2,
                stock: 0,
                availability: "in-stock",
                unit: "1 pc",
                featured: false,
                ...cloneDeep(product),
                id,
            });
            notify("products");
            return id;
        },

        updateProduct: (productId, updates) => {
            const index = state.products.findIndex((p) => p.id === productId);
            if (index === -1) throw new Error(`Product ${productId} not found`);
            const nextProduct = { ...state.products[index], ...cloneDeep(updates) };
            ensureCategory(nextProduct.category);
            state.products.splice(index, 1, nextProduct);
            notify("products");
            return nextProduct;
        },

        deleteProduct: (productId) => {
            const index = state.products.findIndex((p) => p.id === productId);
            if (index === -1) throw new Error(`Product ${productId} not found`);
            state.products.splice(index, 1);
            notify("products");
            return true;
        },

        addCategory: (category) => {
            const id = category.id || nextId.category();
            if (state.categories.some((cat) => cat.id === id)) {
                throw new Error(`Category ${id} already exists`);
            }
            state.categories.push({
                description: "",
                accent: "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.15))",
                ...cloneDeep(category),
                id,
            });
            notify("categories");
            return id;
        },

        updateCategory: (categoryId, updates) => {
            const index = state.categories.findIndex((c) => c.id === categoryId);
            if (index === -1) throw new Error(`Category ${categoryId} not found`);
            const updated = { ...state.categories[index], ...cloneDeep(updates), id: categoryId };
            state.categories.splice(index, 1, updated);
            notify("categories");
            return updated;
        },

        deleteCategory: (categoryId) => {
            const inUse = state.products.some((p) => p.category === categoryId);
            if (inUse) {
                throw new Error("Category in use by products");
            }
            const index = state.categories.findIndex((c) => c.id === categoryId);
            if (index === -1) throw new Error(`Category ${categoryId} not found`);
            state.categories.splice(index, 1);
            notify("categories");
            return true;
        },

        addOffer: (offer) => {
            if (offer.category) ensureCategory(offer.category);
            const id = offer.id || nextId.offer();
            state.offers.push({
                description: "",
                tags: [],
                discountType: "percentage",
                discountValue: 5,
                validUntil: new Date().toISOString().split("T")[0],
                ...cloneDeep(offer),
                id,
            });
            notify("offers");
            return id;
        },

        updateOffer: (offerId, updates) => {
            const index = state.offers.findIndex((o) => o.id === offerId);
            if (index === -1) throw new Error(`Offer ${offerId} not found`);
            if (updates.category) ensureCategory(updates.category);
            const updated = { ...state.offers[index], ...cloneDeep(updates), id: offerId };
            state.offers.splice(index, 1, updated);
            notify("offers");
            return updated;
        },

        deleteOffer: (offerId) => {
            const index = state.offers.findIndex((o) => o.id === offerId);
            if (index === -1) throw new Error(`Offer ${offerId} not found`);
            state.offers.splice(index, 1);
            notify("offers");
            return true;
        },

        subscribe: (key, callback) => {
            if (!listeners[key]) throw new Error(`Unknown subscription: ${key}`);
            listeners[key].add(callback);
            return () => listeners[key].delete(callback);
        },
    };
};

const Store = createStore(initialData);

const Stats = {
    getTopCategories(limit = 5) {
        const products = Store.getProducts();
        const categoryCounts = products.reduce((acc, product) => {
            acc[product.category] = (acc[product.category] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(categoryCounts)
            .sort(([, countA], [, countB]) => countB - countA)
            .slice(0, limit)
            .map(([categoryId, count]) => ({
                categoryId,
                count,
            }));
    },

    getHeroStats() {
        const products = Store.getProducts();
        const offers = Store.getOffers();
        const latestSales = Store.getSales().slice(-1)[0];
        const growth = latestSales?.months?.slice(-1)[0]?.growth ?? 0;
        return {
            products: products.length,
            offers: offers.length,
            growth,
        };
    },
};

const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(value);

const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(date);
};

const Toast = (() => {
    let toastEl;
    let timer;
    return {
        init() {
            toastEl = document.getElementById("toast");
        },
        show(message, timeout = 2600) {
            if (!toastEl) return;
            toastEl.textContent = message;
            toastEl.classList.add("visible");
            clearTimeout(timer);
            timer = setTimeout(() => {
                toastEl.classList.remove("visible");
            }, timeout);
        },
    };
})();

const availabilityInfo = (availability) => {
    switch (availability) {
        case "in-stock":
            return { text: "In Stock", className: "badge in-stock" };
        case "low-stock":
            return { text: "Low Stock", className: "badge low-stock" };
        default:
            return { text: "Out of Stock", className: "badge out-of-stock" };
    }
};

const UI = (() => {
    const elements = {};
    const filterState = {
        category: "all",
        availability: "all",
        maxPrice: 0,
        search: "",
    };
    let isInitialised = false;

    const cacheElements = () => {
        elements.productGrid = document.getElementById("product-grid");
        elements.offersGrid = document.getElementById("offers-grid");
        elements.cartItems = document.getElementById("cart-items");
        elements.cartSubtotal = document.getElementById("cart-subtotal");
        elements.cartDiscounts = document.getElementById("cart-discounts");
        elements.cartTotal = document.getElementById("cart-total");
        elements.checkoutBtn = document.getElementById("checkout-btn");
        elements.filterCategory = document.getElementById("filter-category");
        elements.filterAvailability = document.getElementById("filter-availability");
        elements.filterPrice = document.getElementById("filter-price");
        elements.filterPriceValue = document.getElementById("filter-price-value");
        elements.filterSearch = document.getElementById("filter-search");
    };

    const getCategoryMap = () => {
        const categories = Store.getCategories();
        return categories.reduce((acc, category) => {
            acc[category.id] = category;
            return acc;
        }, {});
    };

    const updatePriceRangeLimit = () => {
        if (!elements.filterPrice) return;
        const products = Store.getProducts();
        if (!products.length) return;
        const maxProductPrice = Math.ceil(
            products.reduce((max, product) => Math.max(max, product.price), 0) / 10
        ) * 10;
        elements.filterPrice.max = String(maxProductPrice);
        if (filterState.maxPrice === 0 || filterState.maxPrice > maxProductPrice) {
            filterState.maxPrice = maxProductPrice;
        }
        const sliderValue = Number(elements.filterPrice.value);
        if (!Number.isNaN(sliderValue) && sliderValue > 0) {
            filterState.maxPrice = Math.min(sliderValue, maxProductPrice);
        } else {
            elements.filterPrice.value = String(filterState.maxPrice);
        }
        elements.filterPrice.value = String(filterState.maxPrice);
        elements.filterPriceValue.textContent = formatCurrency(filterState.maxPrice);
    };

    const renderCategoryFilter = () => {
        if (!elements.filterCategory) return;
        const categories = Store.getCategories();
        const options = [
            `<option value="all">All categories</option>`,
            ...categories.map(
                (category) =>
                    `<option value="${category.id}">${category.name}</option>`
            ),
        ];
        elements.filterCategory.innerHTML = options.join("");
        if (!categories.find((category) => category.id === filterState.category)) {
            filterState.category = "all";
        }
    };

    const bindFilterEvents = () => {
        elements.filterCategory?.addEventListener("change", (event) => {
            filterState.category = event.target.value;
            renderProducts();
        });

        elements.filterAvailability?.addEventListener("change", (event) => {
            filterState.availability = event.target.value;
            renderProducts();
        });

        elements.filterPrice?.addEventListener("input", (event) => {
            filterState.maxPrice = Number(event.target.value);
            elements.filterPriceValue.textContent = formatCurrency(filterState.maxPrice);
            renderProducts();
        });

        elements.filterSearch?.addEventListener("input", (event) => {
            filterState.search = event.target.value.trim().toLowerCase();
            renderProducts();
        });
    };

    const applyFilters = (products) => {
        const priceLimit = filterState.maxPrice || Number(elements.filterPrice?.max) || Infinity;
        return products.filter((product) => {
            if (
                filterState.category !== "all" &&
                product.category !== filterState.category
            ) {
                return false;
            }

            if (
                filterState.availability !== "all" &&
                product.availability !== filterState.availability
            ) {
                return false;
            }

            if (product.price > priceLimit) {
                return false;
            }

            if (filterState.search) {
                const haystack = [
                    product.name,
                    product.description,
                    product.brand,
                    ...(product.tags || []),
                ]
                    .join(" ")
                    .toLowerCase();
                if (!haystack.includes(filterState.search)) {
                    return false;
                }
            }

            return true;
        });
    };

    const createProductCard = (product, category) => {
        const badge = availabilityInfo(product.availability);
        const disabled = product.availability === "out-of-stock";
        const tags = (product.tags || []).slice(0, 3);
        const tagsMarkup = tags.length
            ? `<div class="tag-group">${tags
                .map((tag) => `<span class="tag">${tag}</span>`)
                .join("")}</div>`
            : "";
        const description = product.description
            ? product.description.length > 130
                ? `${product.description.slice(0, 127)}…`
                : product.description
            : "";
        const categoryName = category?.name ?? "General";
        const categoryAccent = category?.accent
            ? ` style="background:${category.accent};"`
            : "";

        return `
      <article class="product-card" data-product-id="${product.id}">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <div class="product-meta">
          <span class="category-chip"${categoryAccent}>${categoryName}</span>
          <span class="${badge.className}">${badge.text}</span>
        </div>
        <h4>${product.name}</h4>
        <span class="product-brand">${product.brand || ""}</span>
        <p class="product-description">${description}</p>
        ${tagsMarkup}
        <div class="product-footer">
          <div class="product-pricing">
            <span class="price">${formatCurrency(product.price)}</span>
            <span class="unit">${product.unit || ""}</span>
          </div>
          <button class="primary" data-action="add-to-cart" data-product-id="${product.id}" ${disabled ? 'disabled aria-disabled="true"' : ""
            }>
            ${disabled ? "Notify Me" : "Add to Cart"}
          </button>
        </div>
      </article>
    `;
    };

    const renderProducts = () => {
        if (!elements.productGrid) return;
        updatePriceRangeLimit();
        const products = Store.getProducts();
        const filtered = applyFilters(products);
        const categoryMap = getCategoryMap();
        if (!filtered.length) {
            elements.productGrid.innerHTML = `
        <div class="empty-state">
          <h4>No items match your filters</h4>
          <p>Try adjusting the price range or switching categories.</p>
        </div>
      `;
            return;
        }
        elements.productGrid.innerHTML = filtered
            .map((product) => createProductCard(product, categoryMap[product.category]))
            .join("");
    };

    const createOfferCard = (offer, category) => {
        const tags = (offer.tags || []).slice(0, 3);
        const tagsMarkup = tags.length
            ? `<div class="tag-group">${tags
                .map((tag) => `<span class="tag">${tag}</span>`)
                .join("")}</div>`
            : "";
        const categoryName = offer.category
            ? category?.name ?? offer.category
            : "All Categories";
        const discountLabel =
            offer.discountType === "percentage"
                ? `${offer.discountValue}% off`
                : `Save ${formatCurrency(offer.discountValue)}`;
        const validity = offer.validUntil
            ? `Valid till ${formatDate(offer.validUntil)}`
            : "Limited period";

        return `
      <article class="offer-card">
        <h4>${offer.title}</h4>
        <p>${offer.description}</p>
        <div class="offer-meta">
          <span class="offer-category">${categoryName}</span>
          <span class="offer-discount">${discountLabel}</span>
        </div>
        <div class="offer-validity">${validity}</div>
        ${tagsMarkup}
      </article>
    `;
    };

    const renderOffers = () => {
        if (!elements.offersGrid) return;
        const offers = Store.getOffers();
        const categoryMap = getCategoryMap();
        if (!offers.length) {
            elements.offersGrid.innerHTML = `
        <div class="empty-state">
          <h4>No active offers</h4>
          <p>Check back soon for seasonal promotions.</p>
        </div>
      `;
            return;
        }
        elements.offersGrid.innerHTML = offers
            .map((offer) => createOfferCard(offer, categoryMap[offer.category]))
            .join("");
    };

    const createCartItemRow = (item) => `
    <li class="cart-item" data-product-id="${item.productId}">
      <img src="${item.image}" alt="${item.name}" loading="lazy" />
      <div class="cart-info">
        <h5>${item.name}</h5>
        <p>${item.brand ? `${item.brand} · ` : ""}${item.unit || ""}</p>
        <span class="price">${formatCurrency(item.price)}</span>
        <div class="quantity-control" role="group" aria-label="Adjust quantity for ${item.name}">
          <button type="button" class="quantity-btn" data-action="decrement" aria-label="Decrease quantity">−</button>
          <span class="quantity-value" data-role="quantity" data-quantity="${item.quantity}">${item.quantity}</span>
          <button type="button" class="quantity-btn" data-action="increment" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div class="cart-line-total">
        <span>${formatCurrency(item.lineTotal)}</span>
        <button type="button" class="ghost" data-action="remove">Remove</button>
      </div>
    </li>
  `;

    const renderCart = (cartState) => {
        if (!elements.cartItems || !elements.cartSubtotal) return;
        if (!cartState.items.length) {
            elements.cartItems.innerHTML = `
        <li class="empty-state">Your cart is empty. Start adding favourites!</li>
      `;
        } else {
            elements.cartItems.innerHTML = cartState.items
                .map((item) => createCartItemRow(item))
                .join("");
        }
        elements.cartSubtotal.textContent = formatCurrency(cartState.totals.subtotal);
        const discount = cartState.totals.discount;
        elements.cartDiscounts.textContent = `- ${formatCurrency(discount)}`;
        elements.cartTotal.textContent = formatCurrency(cartState.totals.total);
    };

    const bindProductActions = () => {
        elements.productGrid?.addEventListener("click", (event) => {
            const button = event.target.closest("[data-action='add-to-cart']");
            if (!button) return;
            const productId = button.getAttribute("data-product-id");
            if (!productId) return;
            Cart.addItem(productId, 1);
        });
    };

    const bindCartActions = () => {
        elements.cartItems?.addEventListener("click", (event) => {
            const button = event.target.closest("button[data-action]");
            if (!button) return;
            const cartItem = button.closest(".cart-item");
            if (!cartItem) return;
            const productId = cartItem.getAttribute("data-product-id");
            if (!productId) return;
            const action = button.getAttribute("data-action");
            if (action === "increment") {
                Cart.adjustQuantity(productId, 1);
            } else if (action === "decrement") {
                Cart.adjustQuantity(productId, -1);
            } else if (action === "remove") {
                Cart.removeItem(productId);
            }
        });
    };

    const bindCheckout = () => {
        elements.checkoutBtn?.addEventListener("click", () => {
            const snapshot = Cart.getSnapshot();
            if (!snapshot.items.length) {
                Toast.show("Your cart is empty. Add products to checkout.");
                return;
            }
            Toast.show("Checkout simulated. Thank you for shopping!");
            Cart.clear({ silent: true });
        });
    };

    const init = () => {
        if (isInitialised) return;
        cacheElements();
        renderCategoryFilter();
        updatePriceRangeLimit();
        bindFilterEvents();
        bindProductActions();
        bindCartActions();
        bindCheckout();
        renderProducts();
        renderOffers();
        isInitialised = true;
    };

    return {
        init,
        refreshProducts() {
            renderProducts();
        },
        refreshOffers: renderOffers,
        refreshFilters() {
            renderCategoryFilter();
            updatePriceRangeLimit();
        },
        renderCart,
        getFilterState: () => ({ ...filterState }),
    };
})();

const Cart = (() => {
    const items = [];
    const subscribers = new Set();

    const getProductLookup = () => {
        const products = Store.getProducts();
        return products.reduce((acc, product) => {
            acc[product.id] = product;
            return acc;
        }, {});
    };

    const resolveMaxQty = (product) => {
        if (typeof product.stock === "number") {
            if (product.stock <= 0) return 0;
            return product.stock;
        }
        return Infinity;
    };

    const calculateTotals = (productMap) => {
        let subtotal = 0;
        const categoryTotals = {};
        items.forEach((entry) => {
            const product = productMap[entry.productId];
            if (!product) return;
            const lineTotal = Number(product.price) * entry.quantity;
            subtotal += lineTotal;
            categoryTotals[product.category] =
                (categoryTotals[product.category] || 0) + lineTotal;
        });
        const offers = Store.getOffers();
        let discount = 0;
        const appliedFlat = new Set();
        offers.forEach((offer) => {
            const baseAmount = offer.category
                ? categoryTotals[offer.category] || 0
                : subtotal;
            if (!baseAmount) return;
            if (offer.discountType === "percentage") {
                discount += (baseAmount * offer.discountValue) / 100;
            } else if (offer.discountType === "flat" && !appliedFlat.has(offer.id)) {
                discount += offer.discountValue;
                appliedFlat.add(offer.id);
            }
        });
        discount = Math.min(discount, subtotal);
        const total = Math.max(subtotal - discount, 0);
        return { subtotal, discount, total };
    };

    const buildSnapshot = () => {
        const productMap = getProductLookup();
        const detailedItems = items
            .map((entry) => {
                const product = productMap[entry.productId];
                if (!product) return null;
                const lineTotal = Number(product.price) * entry.quantity;
                return {
                    id: entry.productId,
                    productId: entry.productId,
                    name: product.name,
                    brand: product.brand,
                    unit: product.unit,
                    price: product.price,
                    quantity: entry.quantity,
                    image: product.image,
                    category: product.category,
                    availability: product.availability,
                    lineTotal,
                };
            })
            .filter(Boolean);
        const totals = calculateTotals(productMap);
        const itemCount = detailedItems.reduce((sum, item) => sum + item.quantity, 0);
        return { items: detailedItems, totals, itemCount };
    };

    const notify = () => {
        const snapshot = buildSnapshot();
        subscribers.forEach((callback) => callback(snapshot));
    };

    const removeItem = (productId, options = {}) => {
        const index = items.findIndex((item) => item.productId === productId);
        if (index === -1) return;
        const productMap = getProductLookup();
        const product = productMap[productId];
        items.splice(index, 1);
        notify();
        if (!options.silent) {
            const name = product?.name || "Item";
            Toast.show(`${name} removed from cart.`);
        }
    };

    const clear = (options = {}) => {
        if (!items.length) return;
        items.splice(0, items.length);
        notify();
        if (!options.silent) {
            Toast.show("Cart cleared.");
        }
    };

    const addItem = (productId, quantity = 1) => {
        const productMap = getProductLookup();
        const product = productMap[productId];
        if (!product) {
            Toast.show("Product unavailable at the moment.");
            return;
        }
        const maxQty = resolveMaxQty(product);
        if (maxQty <= 0 || product.availability === "out-of-stock") {
            Toast.show(`${product.name} is currently unavailable.`);
            return;
        }
        const entry = items.find((item) => item.productId === productId);
        if (entry) {
            const nextQty = Math.min(entry.quantity + quantity, maxQty);
            if (nextQty === entry.quantity) {
                Toast.show(`Maximum stock reached for ${product.name}.`);
                return;
            }
            entry.quantity = nextQty;
            notify();
            Toast.show(`${product.name} quantity updated.`);
            return;
        }
        items.push({ productId, quantity: Math.min(quantity, maxQty) });
        notify();
        Toast.show(`${product.name} added to cart.`);
    };

    const updateQuantity = (productId, quantity) => {
        const entry = items.find((item) => item.productId === productId);
        if (!entry) return;
        const productMap = getProductLookup();
        const product = productMap[productId];
        if (!product) {
            removeItem(productId, { silent: true });
            return;
        }
        const maxQty = resolveMaxQty(product);
        const nextQty = Math.max(0, Math.min(quantity, maxQty));
        if (nextQty <= 0) {
            removeItem(productId);
            return;
        }
        entry.quantity = nextQty;
        notify();
    };

    const adjustQuantity = (productId, delta) => {
        const entry = items.find((item) => item.productId === productId);
        if (!entry) return;
        updateQuantity(productId, entry.quantity + delta);
    };

    const subscribe = (callback) => {
        subscribers.add(callback);
        return () => subscribers.delete(callback);
    };

    const getSnapshot = () => buildSnapshot();

    const revalidate = () => {
        const productMap = getProductLookup();
        let changed = false;
        for (let i = items.length - 1; i >= 0; i -= 1) {
            const entry = items[i];
            const product = productMap[entry.productId];
            if (!product || product.availability === "out-of-stock") {
                items.splice(i, 1);
                changed = true;
                continue;
            }
            const maxQty = resolveMaxQty(product);
            if (entry.quantity > maxQty) {
                if (maxQty <= 0) {
                    items.splice(i, 1);
                } else {
                    entry.quantity = maxQty;
                }
                changed = true;
            }
        }
        if (changed) {
            notify();
        }
    };

    return {
        addItem,
        updateQuantity,
        adjustQuantity,
        removeItem,
        clear,
        subscribe,
        getSnapshot,
        revalidate,
    };
})();

const AdminPanel = (() => {
    const elements = {};
    const state = {
        activeModal: null,
    };

    const cacheElements = () => {
        elements.productModal = document.getElementById("product-modal");
        elements.categoryModal = document.getElementById("category-modal");
        elements.offerModal = document.getElementById("offer-modal");

        elements.productForm = document.getElementById("product-form");
        elements.categoryForm = document.getElementById("category-form");
        elements.offerForm = document.getElementById("offer-form");

        elements.productTableBody = document.querySelector(
            "#admin-products-table tbody"
        );
        elements.categoryList = document.getElementById("admin-categories-list");
        elements.offerList = document.getElementById("admin-offers-list");

        elements.productCategorySelect = document.getElementById("product-category");
        elements.offerCategorySelect = document.getElementById("offer-category");

        elements.productIdInput = document.getElementById("product-id");
        elements.productNameInput = document.getElementById("product-name");
        elements.productBrandInput = document.getElementById("product-brand");
        elements.productPriceInput = document.getElementById("product-price");
        elements.productUnitInput = document.getElementById("product-unit");
        elements.productStockInput = document.getElementById("product-stock");
        elements.productAvailabilitySelect = document.getElementById(
            "product-availability"
        );
        elements.productImageInput = document.getElementById("product-image");
        elements.productTagsInput = document.getElementById("product-tags");
        elements.productFeaturedInput = document.getElementById("product-featured");
        elements.productDescriptionInput = document.getElementById(
            "product-description"
        );

        elements.categoryIdInput = document.getElementById("category-id");
        elements.categoryNameInput = document.getElementById("category-name");
        elements.categoryDescriptionInput = document.getElementById(
            "category-description"
        );

        elements.offerIdInput = document.getElementById("offer-id");
        elements.offerTitleInput = document.getElementById("offer-title");
        elements.offerDescriptionInput = document.getElementById("offer-description");
        elements.offerValidUntilInput = document.getElementById("offer-valid-until");
        elements.offerDiscountTypeSelect = document.getElementById(
            "offer-discount-type"
        );
        elements.offerDiscountValueInput = document.getElementById(
            "offer-discount-value"
        );
        elements.offerTagsInput = document.getElementById("offer-tags");
    };

    const openModal = (id, mode = "create") => {
        const modal = document.getElementById(id);
        if (!modal) return;
        modal.setAttribute("aria-hidden", "false");
        modal.dataset.mode = mode;
        state.activeModal = modal;
        document.body.style.overflow = "hidden";
        const firstField = modal.querySelector(
            'input:not([type="hidden"]), select, textarea'
        );
        firstField?.focus();
    };

    const closeModal = (id) => {
        const modal = document.getElementById(id);
        if (!modal) return;
        modal.setAttribute("aria-hidden", "true");
        if (modal === state.activeModal) {
            state.activeModal = null;
            document.body.style.overflow = "";
        }
        if (modal.contains(elements.productForm)) resetProductForm();
        if (modal.contains(elements.categoryForm)) resetCategoryForm();
        if (modal.contains(elements.offerForm)) resetOfferForm();
    };

    const resetProductForm = () => {
        elements.productForm?.reset();
        if (elements.productIdInput) elements.productIdInput.value = "";
        if (elements.productFeaturedInput)
            elements.productFeaturedInput.checked = false;
    };

    const resetCategoryForm = () => {
        elements.categoryForm?.reset();
        if (elements.categoryIdInput) elements.categoryIdInput.value = "";
    };

    const resetOfferForm = () => {
        elements.offerForm?.reset();
        if (elements.offerIdInput) elements.offerIdInput.value = "";
    };

    const syncCategoryOptions = () => {
        const categories = Store.getCategories();
        if (elements.productCategorySelect) {
            elements.productCategorySelect.innerHTML = categories
                .map(
                    (category) =>
                        `<option value="${category.id}">${category.name}</option>`
                )
                .join("");
        }
        if (elements.offerCategorySelect) {
            const options = [
                `<option value="">All Categories</option>`,
                ...categories.map(
                    (category) =>
                        `<option value="${category.id}">${category.name}</option>`
                ),
            ];
            elements.offerCategorySelect.innerHTML = options.join("");
        }
    };

    const parseTags = (value = "") =>
        value
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);

    const renderProducts = () => {
        if (!elements.productTableBody) return;
        const products = Store.getProducts();
        const categories = Store.getCategories().reduce((acc, category) => {
            acc[category.id] = category;
            return acc;
        }, {});
        if (!products.length) {
            elements.productTableBody.innerHTML =
                '<tr><td colspan="5" class="empty-cell">No products available. Add your first product.</td></tr>';
            return;
        }
        elements.productTableBody.innerHTML = products
            .map((product) => {
                const category = categories[product.category];
                const badge = availabilityInfo(product.availability);
                return `
          <tr data-product-id="${product.id}">
            <td>
              <strong>${product.name}</strong>
              <span class="table-subtext">${product.brand || ""}</span>
            </td>
            <td>${category?.name ?? product.category}</td>
            <td>${formatCurrency(product.price)}</td>
            <td><span class="${badge.className}">${badge.text}</span></td>
            <td>
              <div class="admin-actions">
                <button type="button" class="ghost button-small" data-action="edit" data-id="${product.id
                    }">Edit</button>
                <button type="button" class="secondary button-small" data-action="delete" data-id="${product.id
                    }">Delete</button>
              </div>
            </td>
          </tr>
        `;
            })
            .join("");
    };

    const renderCategories = () => {
        if (!elements.categoryList) return;
        const categories = Store.getCategories();
        const products = Store.getProducts();
        const productCounts = products.reduce((acc, product) => {
            acc[product.category] = (acc[product.category] || 0) + 1;
            return acc;
        }, {});
        if (!categories.length) {
            elements.categoryList.innerHTML =
                '<li class="empty-state">No categories yet. Create one to organise products.</li>';
            return;
        }
        elements.categoryList.innerHTML = categories
            .map((category) => `
        <li class="admin-list-item" data-category-id="${category.id}">
          <div>
            <h5>${category.name}</h5>
            <p>${category.description || ""}</p>
            <span class="table-subtext">${productCounts[category.id] || 0} products</span>
          </div>
          <div class="admin-actions">
            <button type="button" class="ghost button-small" data-action="edit" data-id="${category.id
                }">Edit</button>
            <button type="button" class="secondary button-small" data-action="delete" data-id="${category.id
                }">Delete</button>
          </div>
        </li>
      `)
            .join("");
    };

    const renderOffers = () => {
        if (!elements.offerList) return;
        const offers = Store.getOffers();
        const categories = Store.getCategories().reduce((acc, category) => {
            acc[category.id] = category;
            return acc;
        }, {});
        if (!offers.length) {
            elements.offerList.innerHTML =
                '<li class="empty-state">No offers running. Add promotions to highlight deals.</li>';
            return;
        }
        elements.offerList.innerHTML = offers
            .map((offer) => {
                const categoryName = offer.category
                    ? categories[offer.category]?.name ?? offer.category
                    : "All Categories";
                const discountLabel =
                    offer.discountType === "percentage"
                        ? `${offer.discountValue}% off`
                        : `Save ${formatCurrency(offer.discountValue)}`;
                return `
          <li class="admin-list-item" data-offer-id="${offer.id}">
            <div>
              <h5>${offer.title}</h5>
              <p>${offer.description}</p>
              <span class="table-subtext">${discountLabel} · ${categoryName}</span>
              <span class="table-subtext">Valid till ${formatDate(offer.validUntil)}</span>
            </div>
            <div class="admin-actions">
              <button type="button" class="ghost button-small" data-action="edit" data-id="${offer.id
                    }">Edit</button>
              <button type="button" class="secondary button-small" data-action="delete" data-id="${offer.id
                    }">Delete</button>
            </div>
          </li>
        `;
            })
            .join("");
    };

    const fillProductForm = (product) => {
        if (!elements.productForm) return;
        elements.productIdInput.value = product.id;
        elements.productNameInput.value = product.name;
        elements.productBrandInput.value = product.brand || "";
        elements.productCategorySelect.value = product.category;
        elements.productPriceInput.value = product.price;
        elements.productUnitInput.value = product.unit || "";
        elements.productStockInput.value = product.stock;
        elements.productAvailabilitySelect.value = product.availability;
        elements.productImageInput.value = product.image || "";
        elements.productTagsInput.value = (product.tags || []).join(", ");
        elements.productFeaturedInput.checked = Boolean(product.featured);
        elements.productDescriptionInput.value = product.description || "";
    };

    const fillCategoryForm = (category) => {
        if (!elements.categoryForm) return;
        elements.categoryIdInput.value = category.id;
        elements.categoryNameInput.value = category.name;
        elements.categoryDescriptionInput.value = category.description || "";
    };

    const fillOfferForm = (offer) => {
        if (!elements.offerForm) return;
        elements.offerIdInput.value = offer.id;
        elements.offerTitleInput.value = offer.title;
        elements.offerDescriptionInput.value = offer.description || "";
        elements.offerValidUntilInput.value = offer.validUntil || "";
        elements.offerCategorySelect.value = offer.category || "";
        elements.offerDiscountTypeSelect.value = offer.discountType || "percentage";
        elements.offerDiscountValueInput.value = offer.discountValue ?? 0;
        elements.offerTagsInput.value = (offer.tags || []).join(", ");
    };

    const handleModalTrigger = (event) => {
        const button = event.currentTarget;
        const modalId = button.dataset.modal;
        if (!modalId) return;
        if (modalId === "product-modal") resetProductForm();
        if (modalId === "category-modal") resetCategoryForm();
        if (modalId === "offer-modal") resetOfferForm();
        openModal(modalId, "create");
    };

    const handleModalClose = (event) => {
        const button = event.currentTarget;
        const modalId = button.dataset.close;
        if (!modalId) return;
        closeModal(modalId);
    };

    const handleOverlayClick = (event) => {
        if (event.target.classList.contains("modal")) {
            closeModal(event.target.id);
        }
    };

    const handleKeydown = (event) => {
        if (event.key === "Escape" && state.activeModal) {
            closeModal(state.activeModal.id);
        }
    };

    const onProductSubmit = (event) => {
        event.preventDefault();
        try {
            const payload = {
                name: elements.productNameInput.value.trim(),
                brand: elements.productBrandInput.value.trim(),
                category: elements.productCategorySelect.value,
                price: Number(elements.productPriceInput.value),
                unit: elements.productUnitInput.value.trim(),
                stock: Number(elements.productStockInput.value),
                availability: elements.productAvailabilitySelect.value,
                image: elements.productImageInput.value.trim(),
                tags: parseTags(elements.productTagsInput.value),
                featured: elements.productFeaturedInput.checked,
                description: elements.productDescriptionInput.value.trim(),
            };

            if (!payload.name || !payload.category || Number.isNaN(payload.price)) {
                throw new Error("Please fill mandatory product fields.");
            }

            const productId = elements.productIdInput.value;
            if (productId) {
                Store.updateProduct(productId, payload);
                Toast.show("Product updated successfully.");
            } else {
                const newId = Store.addProduct(payload);
                Toast.show("New product added to catalogue.");
                fillProductForm({ ...payload, id: newId });
            }
            closeModal("product-modal");
        } catch (error) {
            Toast.show(error.message || "Unable to save product.");
        }
    };

    const onCategorySubmit = (event) => {
        event.preventDefault();
        try {
            const payload = {
                name: elements.categoryNameInput.value.trim(),
                description: elements.categoryDescriptionInput.value.trim(),
            };
            if (!payload.name) throw new Error("Category name is required.");
            const categoryId = elements.categoryIdInput.value;
            if (categoryId) {
                Store.updateCategory(categoryId, payload);
                Toast.show("Category updated.");
            } else {
                Store.addCategory(payload);
                Toast.show("Category created.");
            }
            closeModal("category-modal");
        } catch (error) {
            Toast.show(error.message || "Unable to save category.");
        }
    };

    const onOfferSubmit = (event) => {
        event.preventDefault();
        try {
            const payload = {
                title: elements.offerTitleInput.value.trim(),
                description: elements.offerDescriptionInput.value.trim(),
                validUntil: elements.offerValidUntilInput.value,
                category: elements.offerCategorySelect.value || null,
                discountType: elements.offerDiscountTypeSelect.value,
                discountValue: Number(elements.offerDiscountValueInput.value),
                tags: parseTags(elements.offerTagsInput.value),
            };
            if (!payload.title || Number.isNaN(payload.discountValue)) {
                throw new Error("Please provide offer title and discount details.");
            }
            const offerId = elements.offerIdInput.value;
            if (offerId) {
                Store.updateOffer(offerId, payload);
                Toast.show("Offer updated.");
            } else {
                Store.addOffer(payload);
                Toast.show("Offer created.");
            }
            closeModal("offer-modal");
        } catch (error) {
            Toast.show(error.message || "Unable to save offer.");
        }
    };

    const handleProductTableClick = (event) => {
        const button = event.target.closest("button[data-action]");
        if (!button) return;
        const productId = button.dataset.id;
        if (!productId) return;
        if (button.dataset.action === "edit") {
            const product = Store.getProducts().find((item) => item.id === productId);
            if (!product) return;
            fillProductForm(product);
            openModal("product-modal", "edit");
        } else if (button.dataset.action === "delete") {
            const confirmDelete = window.confirm(
                "Delete this product? This action cannot be undone."
            );
            if (!confirmDelete) return;
            try {
                Store.deleteProduct(productId);
                Toast.show("Product removed.");
            } catch (error) {
                Toast.show(error.message || "Unable to delete product.");
            }
        }
    };

    const handleCategoryListClick = (event) => {
        const button = event.target.closest("button[data-action]");
        if (!button) return;
        const categoryId = button.dataset.id;
        if (!categoryId) return;
        if (button.dataset.action === "edit") {
            const category = Store.getCategories().find(
                (item) => item.id === categoryId
            );
            if (!category) return;
            fillCategoryForm(category);
            openModal("category-modal", "edit");
        } else if (button.dataset.action === "delete") {
            const confirmDelete = window.confirm(
                "Delete this category? Products using it must be reassigned first."
            );
            if (!confirmDelete) return;
            try {
                Store.deleteCategory(categoryId);
                Toast.show("Category deleted.");
            } catch (error) {
                Toast.show(error.message || "Unable to delete category.");
            }
        }
    };

    const handleOfferListClick = (event) => {
        const button = event.target.closest("button[data-action]");
        if (!button) return;
        const offerId = button.dataset.id;
        if (!offerId) return;
        if (button.dataset.action === "edit") {
            const offer = Store.getOffers().find((item) => item.id === offerId);
            if (!offer) return;
            fillOfferForm(offer);
            openModal("offer-modal", "edit");
        } else if (button.dataset.action === "delete") {
            const confirmDelete = window.confirm(
                "Delete this offer? Customers will no longer see it.");
            if (!confirmDelete) return;
            try {
                Store.deleteOffer(offerId);
                Toast.show("Offer removed.");
            } catch (error) {
                Toast.show(error.message || "Unable to delete offer.");
            }
        }
    };

    const bindEvents = () => {
        document
            .querySelectorAll("[data-modal]")
            .forEach((button) => button.addEventListener("click", handleModalTrigger));
        document
            .querySelectorAll("[data-close]")
            .forEach((button) => button.addEventListener("click", handleModalClose));
        document
            .querySelectorAll(".modal")
            .forEach((modal) => modal.addEventListener("click", handleOverlayClick));
        document.addEventListener("keydown", handleKeydown);

        elements.productForm?.addEventListener("submit", onProductSubmit);
        elements.categoryForm?.addEventListener("submit", onCategorySubmit);
        elements.offerForm?.addEventListener("submit", onOfferSubmit);

        elements.productTableBody?.addEventListener("click", handleProductTableClick);
        elements.categoryList?.addEventListener("click", handleCategoryListClick);
        elements.offerList?.addEventListener("click", handleOfferListClick);
    };

    const init = () => {
        cacheElements();
        syncCategoryOptions();
        renderProducts();
        renderCategories();
        renderOffers();
        bindEvents();

        Store.subscribe("products", () => {
            syncCategoryOptions();
            renderProducts();
        });

        Store.subscribe("categories", () => {
            syncCategoryOptions();
            renderCategories();
            renderProducts();
            renderOffers();
        });

        Store.subscribe("offers", () => {
            renderOffers();
        });
    };

    return { init, syncCategoryOptions };
})();

const Dashboard = (() => {
    const elements = {};
    let chartInstance;

    const metricLabels = {
        revenue: "Monthly Revenue",
        orders: "Monthly Orders",
        growth: "Monthly Growth %",
    };

    const metricFormatters = {
        revenue: (value) => formatCurrency(value),
        orders: (value) =>
            new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
                value
            ),
        growth: (value) => `${value.toFixed(1)}%`,
    };

    const formatCompact = (value) =>
        new Intl.NumberFormat("en-IN", {
            notation: "compact",
            maximumFractionDigits: 1,
        }).format(value);

    const cacheElements = () => {
        elements.yearSelect = document.getElementById("dashboard-year");
        elements.categorySelect = document.getElementById("dashboard-category");
        elements.metricSelect = document.getElementById("dashboard-metric");
        elements.chartCanvas = document.getElementById("sales-chart");
        elements.metricsContainer = document.getElementById("dashboard-metrics");
    };

    const populateFilters = () => {
        const sales = Store.getSales();
        if (elements.yearSelect) {
            const yearOptions = sales
                .map((entry) => `<option value="${entry.year}">${entry.year}</option>`)
                .join("");
            elements.yearSelect.innerHTML = yearOptions;
            if (!elements.yearSelect.value && sales.length) {
                elements.yearSelect.value = String(sales[sales.length - 1].year);
            }
        }

        if (elements.categorySelect) {
            const categories = Store.getCategories();
            const categoryOptions = [
                `<option value="all">All categories</option>`,
                ...categories.map(
                    (category) =>
                        `<option value="${category.id}">${category.name}</option>`
                ),
            ];
            const previous = elements.categorySelect.value || "all";
            elements.categorySelect.innerHTML = categoryOptions.join("");
            const categoryExists =
                previous === "all" ||
                categories.some((category) => category.id === previous);
            elements.categorySelect.value = categoryExists ? previous : "all";
        }
    };

    const getFilters = () => ({
        year: Number(elements.yearSelect?.value) || Store.getSales()?.slice(-1)[0]?.year,
        category: elements.categorySelect?.value || "all",
        metric: elements.metricSelect?.value || "revenue",
    });

    const getYearData = (year) =>
        Store.getSales().find((entry) => Number(entry.year) === Number(year));

    const computeCategoryGrowth = (months, index, categoryId) => {
        if (index === 0) return months[index].growth ?? 0;
        const current = months[index].breakdown?.[categoryId] ?? 0;
        const previous = months[index - 1].breakdown?.[categoryId] ?? 0;
        if (!previous) return current ? 100 : 0;
        return ((current - previous) / previous) * 100;
    };

    const buildSeries = (yearData, categoryId, metric) => {
        if (!yearData) return [];
        return yearData.months.map((monthData, index) => {
            const revenue =
                categoryId === "all"
                    ? monthData.revenue
                    : monthData.breakdown?.[categoryId] ?? 0;
            const orders =
                categoryId === "all"
                    ? monthData.orders
                    : Math.round(
                        (monthData.orders * (revenue || 0)) /
                        (monthData.revenue || 1)
                    );
            const growth =
                categoryId === "all"
                    ? monthData.growth
                    : computeCategoryGrowth(yearData.months, index, categoryId);
            const value =
                metric === "revenue"
                    ? revenue
                    : metric === "orders"
                        ? orders
                        : growth;
            return {
                month: monthData.month,
                revenue,
                orders,
                growth,
                value,
            };
        });
    };

    const renderChart = (series, metric) => {
        if (!elements.chartCanvas) return;
        const context = elements.chartCanvas.getContext("2d");
        const labels = series.map((point) => point.month);
        const dataValues = series.map((point) => Number(point.value.toFixed(2)));

        const gradient = context.createLinearGradient(0, 0, 0, 280);
        gradient.addColorStop(0, "rgba(255, 173, 92, 0.7)");
        gradient.addColorStop(1, "rgba(146, 220, 174, 0.15)");

        const borderColor = metric === "growth" ? "#92dcae" : "#ffad5c";

        if (!chartInstance) {
            chartInstance = new Chart(context, {
                type: "line",
                data: {
                    labels,
                    datasets: [
                        {
                            label: metricLabels[metric],
                            data: dataValues,
                            fill: true,
                            backgroundColor: gradient,
                            borderColor,
                            borderWidth: 2,
                            tension: 0.35,
                            pointRadius: 4,
                            pointBackgroundColor: "#ffffff",
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            ticks: {
                                color: "rgba(255,255,255,0.7)",
                            },
                            grid: {
                                color: "rgba(255,255,255,0.05)",
                            },
                        },
                        y: {
                            ticks: {
                                color: "rgba(255,255,255,0.7)",
                                callback: (value) => {
                                    if (metric === "revenue") return `₹${formatCompact(value)}`;
                                    if (metric === "orders") return formatCompact(value);
                                    return `${value}%`;
                                },
                            },
                            grid: {
                                color: "rgba(255,255,255,0.05)",
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            position: "top",
                            labels: {
                                color: "rgba(255,255,255,0.8)",
                            },
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) =>
                                    `${metricLabels[metric]}: ${metricFormatters[metric](
                                        Number(context.parsed.y)
                                    )}`,
                            },
                        },
                    },
                },
            });
        } else {
            chartInstance.data.labels = labels;
            chartInstance.data.datasets[0].data = dataValues;
            chartInstance.data.datasets[0].label = metricLabels[metric];
            chartInstance.data.datasets[0].borderColor = borderColor;
            chartInstance.update();
        }
    };

    const renderMetricCards = (series, filters) => {
        if (!elements.metricsContainer) return;
        if (!series.length) {
            elements.metricsContainer.innerHTML = `
        <div class="metric-card">
          <span>No data available</span>
          <strong class="metric-value">--</strong>
          <span class="metric-helper">Please add sales data for this year.</span>
        </div>
      `;
            return;
        }

        const totalRevenue = series.reduce((sum, point) => sum + point.revenue, 0);
        const totalOrders = series.reduce((sum, point) => sum + point.orders, 0);
        const avgGrowth =
            series.reduce((sum, point) => sum + point.growth, 0) / series.length;

        const topByValue = series.reduce((best, current) =>
            current.value > best.value ? current : best
        );

        const metricCards = [];

        if (filters.metric === "revenue") {
            metricCards.push(
                {
                    label: "Year-to-date Revenue",
                    value: metricFormatters.revenue(totalRevenue),
                    helper: `${filters.category === "all" ? "All categories" : "Selected category"} ${filters.year
                        }`,
                },
                {
                    label: "Top Performing Month",
                    value: `${topByValue.month}`,
                    helper: metricFormatters.revenue(topByValue.value),
                },
                {
                    label: "Average Monthly Growth",
                    value: metricFormatters.growth(avgGrowth),
                    helper: "Relative to previous month",
                }
            );
        } else if (filters.metric === "orders") {
            const avgOrderValue = totalOrders
                ? totalRevenue / totalOrders
                : 0;
            metricCards.push(
                {
                    label: "Total Orders",
                    value: metricFormatters.orders(totalOrders),
                    helper: `${series.length} months recorded`,
                },
                {
                    label: "Peak Month",
                    value: `${topByValue.month}`,
                    helper: `${metricFormatters.orders(topByValue.value)} orders`,
                },
                {
                    label: "Avg Order Value",
                    value: metricFormatters.revenue(avgOrderValue),
                    helper: "Revenue / Orders",
                }
            );
        } else {
            const minGrowth = series.reduce(
                (min, point) => (point.value < min.value ? point : min),
                series[0]
            );
            const range = topByValue.value - minGrowth.value;
            metricCards.push(
                {
                    label: "Average Growth",
                    value: metricFormatters.growth(avgGrowth),
                    helper: `Across ${series.length} months`,
                },
                {
                    label: "Best Month",
                    value: `${topByValue.month}`,
                    helper: `${metricFormatters.growth(topByValue.value)}`,
                },
                {
                    label: "Growth Range",
                    value: metricFormatters.growth(range),
                    helper: "Highest - Lowest",
                }
            );
        }

        elements.metricsContainer.innerHTML = metricCards
            .map(
                (card) => `
        <div class="metric-card">
          <span>${card.label}</span>
          <strong class="metric-value">${card.value}</strong>
          <span class="metric-helper">${card.helper}</span>
        </div>
      `
            )
            .join("");
    };

    const update = () => {
        const filters = getFilters();
        const yearData = getYearData(filters.year);
        const series = buildSeries(yearData, filters.category, filters.metric);
        renderChart(series, filters.metric);
        renderMetricCards(series, filters);
    };

    const bindEvents = () => {
        elements.yearSelect?.addEventListener("change", update);
        elements.categorySelect?.addEventListener("change", update);
        elements.metricSelect?.addEventListener("change", update);
    };

    const init = () => {
        cacheElements();
        populateFilters();
        bindEvents();
        update();

        Store.subscribe("categories", () => {
            populateFilters();
            update();
        });

        Store.subscribe("sales", () => {
            populateFilters();
            update();
        });
    };

    return { init, update };
})();

const updateHeroStats = () => {
    const heroStats = Stats.getHeroStats();
    const productsStatEl = document.getElementById("stat-products");
    const offersStatEl = document.getElementById("stat-offers");
    const growthStatEl = document.getElementById("stat-growth");
    if (productsStatEl) productsStatEl.textContent = `${heroStats.products}+`;
    if (offersStatEl) offersStatEl.textContent = `${heroStats.offers}`;
    if (growthStatEl) growthStatEl.textContent = `${heroStats.growth}%`;
};

document.addEventListener("DOMContentLoaded", () => {
    const footerYearEl = document.getElementById("footer-year");
    if (footerYearEl) {
        footerYearEl.textContent = new Date().getFullYear();
    }

    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.addEventListener("click", () => {
        if (!navLinks) return;
        const isOpen = navLinks.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    navLinks?.querySelectorAll("a").forEach((link) =>
        link.addEventListener("click", () => {
            if (!navLinks.classList.contains("open")) return;
            navLinks.classList.remove("open");
            navToggle?.setAttribute("aria-expanded", "false");
        })
    );

    Toast.init();
    UI.init();
    UI.renderCart(Cart.getSnapshot());
    Cart.subscribe(UI.renderCart);
    AdminPanel.init();
    Dashboard.init();

    updateHeroStats();

    Store.subscribe("products", () => {
        UI.refreshFilters();
        UI.refreshProducts();
        updateHeroStats();
        Cart.revalidate();
    });

    Store.subscribe("offers", () => {
        UI.refreshOffers();
        updateHeroStats();
        Cart.revalidate();
    });

    Store.subscribe("categories", () => {
        UI.refreshFilters();
        UI.refreshProducts();
        UI.refreshOffers();
    });
});
