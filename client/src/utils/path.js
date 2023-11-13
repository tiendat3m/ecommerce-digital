const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    PRODUCTS__CATEGORY: ':category',
    PRODUCTS: 'products',
    BLOGS: 'blogs',
    OUR_SERVICES: 'services',
    FAQ: 'faqs',
    DETAIL_PRODUCT__CATEGORY__PID__TITLE: ':category/:pid/:title',
    DETAIL_CART: 'my-cart',
    FINAL_REGISTER: 'finalregister/:status',
    RESET_PASSWORD: 'reset-password/:token',

    //ADMIN
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    MANAGER_USER: 'manage-user',
    MANAGER_PRODUCT: 'manage-product',
    MANAGER_ORDER: 'manage-order',
    CREATE_PRODUCT: 'create-product',
    // UPDATE_PRODUCT: 'update-product',

    //MEMBER
    PERSONAL: 'personal',
    MEMBER: 'member',
    MY_CART: 'my-cart',
    HISTORY: 'buy-history',
    WISHLIST: 'wishlist',
    CHECKOUT: 'checkout'
}

export default path