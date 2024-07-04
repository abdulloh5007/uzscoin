export const k10 = 'https://upload.wikimedia.org/wikipedia/commons/d/d6/10000_SUM_AVERS.jpg'
export const k20 = 'https://upload.wikimedia.org/wikipedia/commons/7/71/AVERS_2000_SUM.png'
export const k50 = 'https://upload.wikimedia.org/wikipedia/commons/a/af/50_000_sum_new_front.jpg'
export const k100 = 'https://upload.wikimedia.org/wikipedia/commons/f/fb/100_000_sum_new_front.jpg'
export const k200 = 'https://upload.wikimedia.org/wikipedia/commons/d/df/200_000_sum_new_front.jpg'

function generateCustomId() {
    const prefix = 'UZSlvjs';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = prefix;
    
    // Генерируем оставшиеся 17 символов (24 - 7 (длина префикса))
    for (let i = 0; i < 17; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }

    // Вставляем дефис после 16-го символа
    result = result.slice(0, 16) + '-' + result.slice(16);

    return result;
}

export const collections = [
    {
        id: 1,
        uid: generateCustomId(),
        title: '10,000 $UZS Voucher',
        type: 'for sale',
        desc: '',
        price: 1,
        amount: 10000,
        likes: 0,
        img: k10,
        createdAt: new Date(),
    },
    {
        id: 2,
        uid: generateCustomId(),
        title: '20,000 $UZS Voucher',
        type: 'not for sale',
        desc: '',
        price: 2,
        amount: 20000,
        likes: 5,
        img: k20,
        createdAt: new Date(),
    },
    {
        id: 3,
        uid: generateCustomId(),
        title: '50,000 $UZS Voucher',
        type: 'for sale',
        desc: '',
        price: 5,
        amount: 50000,
        likes: 11,
        img: k50,
        createdAt: new Date(),
    },
    {
        id: 4,
        uid: generateCustomId(),
        title: '100,000 $UZS Voucher',
        type: 'not for sale',
        desc: '',
        price: 10,
        amount: 100000,
        likes: 20,
        img: k100,
        createdAt: new Date(),
    },
    {
        id: 5,
        uid: generateCustomId(),
        title: '200,000 $UZS Voucher',
        type: 'for sale',
        desc: '',
        price: 20,
        amount: 200000,
        likes: 177,
        img: k200,
        createdAt: new Date(),
    },
    {
        id: 6,
        uid: generateCustomId(),
        title: '100,000 $UZS Voucher',
        type: 'not for sale',
        desc: '',
        price: 10,
        amount: 100000,
        likes: 34,
        img: k100,
        createdAt: new Date(),
    },
    {
        id: 7,
        uid: generateCustomId(),
        title: '10,000 $UZS Voucher',
        type: 'for sale',
        desc: '',
        price: 1,
        amount: 10000,
        likes: 42,
        img: k10,
        createdAt: new Date(),
    },
    {
        id: 8,
        uid: generateCustomId(),
        title: '10,000 $UZS Voucher',
        type: 'not for sale',
        desc: '',
        price: 1,
        amount: 10000,
        likes: 42,
        img: k10,
        createdAt: new Date(),
    },
    {
        id: 9,
        uid: generateCustomId(),
        title: '10,000 $UZS Voucher',
        type: 'for sale',
        desc: '',
        price: 1,
        amount: 10000,
        likes: 42,
        img: k10,
        createdAt: new Date(),
    },
    {
        id: 10,
        uid: generateCustomId(),
        title: '10,000 $UZS Voucher',
        type: 'for sale',
        desc: '',
        price: 1,
        amount: 10000,
        likes: 42,
        img: k10,
        createdAt: new Date(),
    },
    {
        id: 11,
        uid: generateCustomId(),
        title: '200,000 $UZS Voucher',
        type: 'not for sale',
        desc: '',
        price: 20,
        amount: 200000,
        likes: 177,
        img: k200,
        createdAt: new Date(),
    },
    {
        id: 12,
        uid: generateCustomId(),
        title: '200,000 $UZS Voucher',
        type: 'not for sale',
        desc: '',
        price: 20,
        amount: 200000,
        likes: 177,
        img: k200,
        createdAt: new Date(),
    },
    {
        id: 13,
        uid: generateCustomId(),
        title: '200,000 $UZS Voucher',
        type: 'not for sale',
        desc: '',
        price: 20,
        amount: 200000,
        likes: 177,
        img: k200,
        createdAt: new Date(),
    },
    {
        id: 14,
        uid: generateCustomId(),
        title: '10,000 $UZS Voucher',
        type: 'for sale',
        desc: '',
        price: 1,
        amount: 10000,
        likes: 42,
        img: k10,
        createdAt: new Date(),
    },
]