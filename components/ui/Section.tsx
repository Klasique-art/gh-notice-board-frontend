import React, { forwardRef } from "react";

type Props = {
    sectionStyles?: string;
    containerStyles?: string;
    titleStyles?: string;
    subtitleStyles?: string;
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    ariaLabelledby?: string | undefined;
    titleId?: string;
};

const Section = forwardRef<HTMLElement, Props>(
    (
        { sectionStyles, containerStyles, titleStyles, subtitleStyles, title, subtitle, children, ariaLabelledby, titleId },
        ref
    ) => {
        return (
            <section
                ref={ref} 
                className={`${sectionStyles} py-20 bg-white`}
                aria-labelledby={ariaLabelledby ? ariaLabelledby : undefined}
            >
                <div className="inner-wrapper">
                    {/* Section Header */}
                    {title && (
                        <div
                            className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${containerStyles}`}
                        >
                            <h2
                                id={titleId}
                                className={`mb-4 uppercase font-bold big-text-2 ${titleStyles}`}
                            >
                                {title}
                            </h2>
                            <p className={`big-text-5 ${subtitleStyles} leading-relaxed`}>
                                {subtitle}
                            </p>
                        </div>
                    )}

                    <div>{children}</div>
                </div>
            </section>
        );
    }
);

Section.displayName = "Section"; 

export default Section;
