import { Link } from "react-router-dom";

interface CategoryItem {
  name: string;
  image: string;
  slug?: string;
}

interface CategoryGridProps {
  title: string;
  items: CategoryItem[];
  link?: string;
}

const CategoryGrid = ({ title, items, link = "/deals" }: CategoryGridProps) => {
  return (
    <div className="bg-card p-5 rounded h-full flex flex-col">
      <h2 className="text-lg font-bold text-card-foreground mb-3">{title}</h2>
      <div className="grid grid-cols-2 gap-3 flex-1">
        {items.slice(0, 4).map((item, index) => (
          <Link key={index} to={item.slug ? `/category/${item.slug}` : link} className="cursor-pointer group">
            <img
              src={item.image}
              alt={item.name}
              className="w-full aspect-square object-cover rounded group-hover:opacity-80 transition-opacity"
            />
            <p className="text-xs text-card-foreground mt-1 line-clamp-2 group-hover:text-amazon-orange">
              {item.name}
            </p>
          </Link>
        ))}
      </div>
      <Link to={link} className="text-amazon-blue text-sm hover:text-amazon-orange hover:underline mt-3">
        See more
      </Link>
    </div>
  );
};

export default CategoryGrid;
