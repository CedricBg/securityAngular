export interface Link{
  title : string
  url : string
  children? : Link[]
  isChildrenVisible? : boolean
}
