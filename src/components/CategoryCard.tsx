interface CategoryCardProps {
  title: string;
  image: string;
  link?: string;
}

const CategoryCard = ({ title, image, link = "#" }: CategoryCardProps) => {
  return (
    <div className="bg-card p-5 rounded cursor-pointer hover:shadow-lg transition-shadow h-full flex flex-col">
      <h2 className="text-lg font-bold text-card-foreground mb-3">{title}</h2>
      <div className="flex-1 mb-3">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded"
        />
      </div>
      <a href={link} className="text-amazon-blue text-sm hover:text-amazon-orange hover:underline">
        See more
      </a>
    </div>
  );
};

export default CategoryCard;
