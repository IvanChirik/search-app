import { TopLevelCategory } from "src/top-page/models/top-page.model";


type routeMapType = Record<TopLevelCategory, string>;

export const CATEGORY_URL: routeMapType = {
    [TopLevelCategory.Courses]: '/courses',
    [TopLevelCategory.Products]: '/products',
    [TopLevelCategory.Books]: '/books',
    [TopLevelCategory.Services]: '/services'
}