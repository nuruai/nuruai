type Item = {
    icone: string;
    title: string;
    description: string;
};

export type Section = {
    key: string;
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    items: Item[];
};

const sections: Section[] = [
    {
        key: "webDevelopment",
        title: "Développement Web",
        subtitle: "Créer des sites web et applications performants.",
        description: "Les technologies modernes pour créer des applications web.",
        imageUrl: "https://example.com/dev.jpg",
        items: [
            {
                icone: "💻",
                title: "React",
                description: "Bibliothèque JavaScript pour construire des interfaces utilisateur."
            },
            {
                icone: "⚙️",
                title: "Next.js",
                description: "Framework React pour le rendu côté serveur et le routing."
            }
        ]
    },
    {
        key: "mobileDevelopment",
        title: "Design UI/UX",
        subtitle: "Concevoir des interfaces utilisateur attrayantes.",
        description: "Créer des expériences utilisateur intuitives et esthétiques.",
        imageUrl: "https://example.com/design.jpg",
        items: [
            {
                icone: "🎨",
                title: "Figma",
                description: "Outil collaboratif pour le design d'interfaces."
            },
            {
                icone: "📐",
                title: "Wireframes",
                description: "Esquisses des interfaces avant le développement."
            }
        ]
    }
];
