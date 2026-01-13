import Link from "next/link";

import {Section} from "@/components";
import { categories } from "@/data/static.general";

const CategoriesSection = () => {
    return (
        <Section
            title="Explore by Category"
            subtitle="Find exactly what you're looking for"
            titleStyles="text-primary"
            subtitleStyles="text-slate-600"
            sectionStyles="bg-slate-50"
            titleId="categories"
            ariaLabelledby="categories"
        >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                        <Link
                            key={category.id}
                            href={`/${category.slug}`}
                            className="group p-6 rounded-xl bg-white border-2 border-slate-200 hover:border-primary hover:shadow-lg transition-all"
                        >
                            <div className={`w-14 h-14 rounded-xl ${category.color} flex-center mb-4 group-hover:scale-110 transition-transform`}>
                                <Icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="big-text-5 font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">
                                {category.name}
                            </h3>
                            <p className="small-text text-slate-600">{category.description}</p>
                        </Link>
                    );
                })}
            </div>
        </Section>
    );
};

export default CategoriesSection;