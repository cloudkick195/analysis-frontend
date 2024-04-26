export enum ReportTypeEnum {
    DATE = 'date',
    MONTH = 'month'
}

export enum CDNVariableEnum {
    PUBLIC = 'public',
    BACKGROUND = 'background',
    BANNER = 'banner',
    MOBILE = 'mobi',
    FOOTERICON = 'footericon'
}

export enum StatusEnum {
    ACTIVE = 1,
    INACTIVE = 0
}

export enum PaymentTypeEnum {
    INCOME = 1,
    EXPENSE = 2
}

export enum AlertTypeEnum {
    SUCCESS = 1,
    WARNING = 2,
    ERROR = 3
}

export const ListStatus = [
    { value: StatusEnum.ACTIVE, label: 'Hoạt động' },
    { value: StatusEnum.INACTIVE, label: 'Chưa hoạt động' },
]

export const ListOrder = ['NULL', 'ASC', 'DESC']

export const Listlimit = [10, 20, 50, 100, 200, 500]