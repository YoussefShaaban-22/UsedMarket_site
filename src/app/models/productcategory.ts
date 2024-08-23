export class productcategory {
  id: any;
  name: any | undefined;
  image: any | undefined;
  description: any | undefined;
  parent_id: any | undefined;
  slug: any | undefined;
  parent?: productcategory;
}
