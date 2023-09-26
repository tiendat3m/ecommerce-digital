const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    PRODUCTS: ':category',
    BLOGS: 'blogs',
    OUR_SERVICES: 'services',
    FAQ: 'faqs',
    DETAIL_PRODUCT__CATEGORY__PID__TITLE: ':category/:pid/:title',
    FINAL_REGISTER: 'finalregister/:status',
    RESET_PASSWORD: 'reset-password/:token',

    //ADMIN
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    MANAGER_USER: 'manage-user',
    MANAGER_PRODUCT: 'manage-product',
    MANAGER_ORDER: 'manage-order',
    CREATE_PRODUCT: 'create-product',

    //MEMBER
    PERSONAL: 'personal',
    MEMBER: 'member'
}

export default path