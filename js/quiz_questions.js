// number of questions to ask
var questions_nb=5;

// reset score
var score=0;

// define questions and answers
var questions = [
    {
    "text": "Qu'est-ce que le paludisme ?",
    "time": 15,
    "answers": [ 
            {
                "text" : "Un medicament",
                "comment": "Le paludisme est une maladie, responsable en 2015 de 438 000 décès.",
                "correct": false,
            },
            {
                "text" : "Un maladie",
                "comment": "En 2015, le paludisme a été responsable de 438 000 décès.",
                "correct": true,
            },
            {
                "text" : "Une mouche",
                "comment": "Le paludisme est une maladie, responsable en 2015 de 438 000 décès.",
                "correct": false,
            },
            {
                "text" : "Un moustique",
                "comment": "Le paludisme est une maladie, responsable en 2015 de 438 000 décès. Cette maladie est transmise par un moustique.",
                "correct": false,
            },
        ]
    },    
    {
    "text": "Que dois-tu faire quand tu penses avoir le paludisme ?",
    "time": 15,
    "answers": [ 
            {
                "text" : "Aller consulter un medecin",
                "comment": "Tu as raison. Dès que tu penses avoir un palu, va rapidement consulter un médecin.",
                "correct": true,
            },
            {
                "text" : "Prendre des médicaments sans consulter un médecin avant",
                "comment": "Seul un médecin peut diagnostiquer avec certitude le paludisme et te prescrire les bons médicaments à prendre.",
                "correct": false,
            },
            {
                "text" : "Attendre que ca passe avec le temps",
                "comment": "On peut mourir du paludisme si celui-ci n'est pas soigné à temps. Il faut allez consultez un médecin dès l'apparition de symptômes.",
                "correct": false,
            },
            {
                "text" : "Aller consulter un guérisseur",
                "comment": "Va consulter un médecin. Il est le seul à pouvoir diagnostique correctement un paludisme.",
                "correct": false,
            },
        ]
    },
    {
    "text" : "Quels sont les symptômes possibles du paludisme ?",
    "time": 15,
    "answers": [ 
            {
                "text" : "Chute des cheveux",
                "comment": "Les symptômes possible du paludisme sont : fièvre, vomissements, fatigue, diarrhée ou mal de tête.",
                "correct": false,
            },
            {
                "text" : "Fièvre, vomissements, fatigue, diarrhée et le mal de tête",
                "comment": "Vas consulter un médecin dès que tu ressens ces symptômes.",
                "correct": true,
            },
            {
                "text" : "Douleur aux orteils",
                "comment": "Les symptômes possible du paludisme sont : fièvre, vomissements, fatigue, diarrhée ou mal de tête.",
                "correct": false,
            },
        ]
    },
    {
    "text" : "Quel insect transmet le paludisme ?",
    "time": 15,
    "answers": [ 
            {
                "text" : "La guêpe",
                "comment": "C'est le moustique qui transmet le paludisme.",
                "correct": false,
            },
            {
                "text" : "La mouche tsé-tsé",
                "comment": "C'est le moustique qui transmet le paludisme.",
                "correct": false,
            },
            {
                "text" : "Le moustique",
                "comment": "On dit que le moustique est le <em>vecteur</em> du paludisme.",
                "correct": true,
            },
        ]
    },
    {
    "text" : "Comment peux-tu te protéger efficacement du paludisme pendant ton sommeil ?",
    "time": 15,
    "answers": [ 
            {
                "text" : "En dormant sous une moustiquaire imprégnée d’insecticide",
                "comment": "La moustiquaire imprégnée d’insecticide est la meilleure protection. Fais attention à ce qu'elle soit sans trou et bien fixée autour du matelas.",
                "correct": true,
            },
            {
                "text" : "En prenant des médicaments contre le paludisme",
                "comment": "Prendre des médicaments pour se protéger du paludisme n'est pas une solution à long terme. La moustiquaire imprégnée d’insecticide est la solution la plus efficace et la plus économique.",
                "correct": false,
            },
            {
                "text" : "Avec un appareil qui produit des ultrasons",
                "comment": "La moustiquaire imprégnée d’insecticide est la solution la plus efficace et la plus économique.",
                "correct": false,
            },
            {
                "text" : "Avec une tapette à mouche",
                "comment": "La moustiquaire imprégnée d’insecticide est la solution la plus efficace et la plus économique.",
                "correct": false,
            },
        ]
    },
    {
    "text" : "En anglais, comment appelle-t-on le paludisme ?",
    "time": 15,
    "answers": [ 
            {
                "text" : "Maludisme",
                "comment": "En anglais, paludisme est appelé malaria.",
                "correct": false,
            },
            {
                "text" : "Palu",
                "comment": "<em>Palu</em> est l’abréviation française de paludisme. En anglais, paludisme est appelé malaria.",
                "correct": false,
            },
            {
                "text" : "Palaria",
                "comment": "En anglais, paludisme est appelé malaria.",
                "correct": false,
            },
            {
                "text" : "Malaria",
                "comment": "Tu as trouvé. Félicitation !",
                "correct": true,
            },
        ]
    },
    {
    "text" : "Quel est le nom du moustique qui transmet le paludisme ?",
    "time": 15,
    "answers": [ 
            {
                "text" : "Paluphèle",
                "comment": "Le moustique qui transmet le paludisme s'appelle anophèle.",
                "correct": false,
            },
            {
                "text" : "Mousticus malarius",
                "comment": "Le moustique qui transmet le paludisme s'appelle anophèle.",
                "correct": false,
            },
            {
                "text" : "Anophèle",
                "comment": "Félicitation ! Cette question était difficile.",
                "correct": true,
            },
        ]
    },
    {
    "text" : "Est-ce que tous les moustiques anophèles transmettent le paludisme ?",
    "time": 15,
    "answers": [ 
            {
                "text" : "Oui",
                "comment": "Seuls les anophèles femelles transmettent le paludisme.",
                "correct": false,
            },
            {
                "text" : "Non",
                "comment": "Tu as raison. Seuls les anophèles femelles transmettent le paludisme.",
                "correct": true,
            },
        ]
    },
    {
    "text" : "Quel examen permet de déterminer si tu as le paludisme ?",
    "time": 15,
    "answers": [ 
            {
                "text" : "La goutte large",
                "comment": "C’est la goutte épaisse qui permet de diagnostiquer un paludisme.",
                "correct": false,
            },
            {
                "text" : "Une échographie",
                "comment": "C’est la goutte épaisse qui permet de diagnostiquer un paludisme.",
                "correct": false,
            },
            {
                "text" : "La goutte épaisse",
                "comment": "La goutte épaisse permet de détecter dans le sang la présence de parasites du paludisme donc de diagnostiquer cette maladie.",
                "correct": true,
            },
        ]
    },
    {
    "text" : "A part la goutte épaisse, quel autre examen permet de déterminer si tu as le paludisme ?",
    "time": 15,
    "answers": [ 
            {
                "text" : "La numération formule sanguine",
                "comment": "Le test de diagnostic rapide (TDR) permet aussi de diagnostiquer le paludisme.",
                "correct": false,
            },
            {
                "text" : "Le test de diagnostic rapide (TDR)",
                "comment": "Le TDR permet aussi de diagnostiquer le paludisme.",
                "correct": true,
            },
            {
                "text" : "Le test d’Emmel",
                "comment": "Le test de diagnostic rapide (TDR) permet aussi de diagnostiquer le paludisme.",
                "correct": false,
            },
        ]
    },
    {
    "text" : "Quelle est l’espèce du parasite responsable de la plupart des cas de paludisme au Congo ?",
    "time": 15,
    "answers": [ 
            {
                "text" : "Plasmodium congolum",
                "comment": "La bonne réponse est Plasmodium falciparum.",
                "correct": false,
            },
            {
                "text" : "Plasmodium falciparum",
                "comment": "C'était une question difficile. Félicitation !",
                "correct": true,
            },
            {
                "text" : "Anophèle",
                "comment": "<em>Anophèle</em> est l'espèce de moustique qui transmet le paludisme. La bonne réponse était Plasmodium falciparum.",
                "correct": false,
            },
         ]
    },
    {
    "text" : "Dans le corps humain, où se cachent et se multiplient les parasites responsables du paludisme ?",
    "time": 15,
    "answers": [ 
            {
                "text" : "Dans les os",
                "comment": "Les parasites du paludisme se cachent et se multiplient dans les cellules du foie.",
                "correct": false,
            },
            {
                "text" : "Dans le sang, à l’intérieur des globules blancs",
                "comment": "Les parasites du paludisme se cachent et se multiplient dans les cellules du foie.",
                "correct": false,
            },
            {
                "text" : "Dans les cellules du foie",
                "comment": "Après s'être multipliés dans le foie, les parasites vont ensuite dans la circulation sanguine.",
                "correct": true,
            },
        ]
    },
    {
    "text" : "Dans le corps humains, où se multiplient les parasites responsable du paludisme jusqu’à provoquer les symptômes de la maladie ?",
    "time": 15,
    "answers": [ 
            {
                "text" : "Dans les cellules du foie",
                "comment": "Lorsque tu ressens les symptômes du paludisme, les parasites se trouvent dans le sang, à l’intérieur des globules rouges.",
                "correct": false,
            },
            {
                "text" : "Dans l’estomac",
                "comment": "Lorsque tu ressens les symptômes du paludisme, les parasites se trouvent dans le sang, à l’intérieur des globules rouges.",
                "correct": false,
            },
            {
                "text" : "Dans le sang, à l’intérieur des globules rouges",
                "comment": "Tu peux alors ressentir les symptômes du paludisme : mal de tête, fatigue, vomissement ou diarrhée.",
                "correct": true,
            },
            {
                "text" : "Dans les os, au niveau des articulations",
                "comment": "Lorsque tu ressens les symptômes du paludisme, les parasites se trouvent dans le sang, à l’intérieur des globules rouges.",
                "correct": false,
            },
        ]
    },
    {
    "text" : "Existe-t-il un vaccin contre le paludisme ?",
    "time": 15,
    "answers": [ 
            {
                "text" : "Oui",
                "comment": "Pour le moment, il n’existe que des vaccins qui sont en cours d’étude qu’on appelle des <em>vaccins candidats</em>. Les chercheurs et les médecins travaillent durs pour qu'un vaccin puisse bientôt protéger les populations.",
                "correct": false,
            },
            {
                "text" : "Non",
                "comment": "Pour le moment, il n’existe que des vaccins qui sont en cours d’étude qu’on appelle des <em>vaccins candidats</em>. Les chercheurs et les médecins travaillent durs pour qu'un vaccin puisse bientôt protéger les populations.",
                "correct": true,
            },
        ]
    },
    {
    "text" : "Peut-on éradiquer le paludisme de la surface de la terre sans un vaccin contre cette maladie ?",
    "time": 15,
    "answers": [ 
            {
                "text" : "Non",
                "comment": "Un vaccin est indispensable pour se débarrasser complètement du paludisme.",
                "correct": true,
            },
            {
                "text" : "Oui",
                "comment": "Seul un vaccin efficace pourra éradiquer rapidement le paludisme de la surface de la terre.",
                "correct": false,
            },
        ]
    },
    {
    "text" : "Est-ce que tu peux savoir si quelqu’un a le paludisme rien qu’en le regardant ?",
    "time": 15,
    "answers": [ 
            {
                "text" : "Oui",
                "comment": "Le seul moyen pour savoir si une personne souffre du paludisme est de faire l'examen de la goutte épaisse ou un test de diagnostic rapide.",
                "correct": false,
            },
            {
                "text" : "Non",
                "comment": "Tu as raison. Seuls un examen de la goutte épaisse ou un test de diagnostic rapide peuvent diagnostiquer le paludisme.",
                "correct": false,
            },
        ]
    },
    {
    "text" : "Pourquoi n’y-a-t-il du paludisme que dans les pays chauds ?",
    "time": 15,
    "answers": [ 
            {
                "text" : "À cause de la pauvreté",
                "comment": "Le climat chaud et humide est favorable à la fois au développement des moustiques anophèles et à l’évolution des parasites du paludisme dans ces anophèles.",
                "correct": false,
            },
            {
                "text" : "À cause du climat",
                "comment": "Le climat chaud et humide est favorable à la fois au développement des moustiques anophèles et à l’évolution des parasites du paludisme dans ces anophèles.",
                "correct": true,
            },
            {
                "text" : "À cause des grandes étendues de forêts et de savanes",
                "comment": "Le climat chaud et humide est favorable à la fois au développement des moustiques anophèles et à l’évolution des parasites du paludisme dans ces anophèles.",
                "correct": false,
            },
        ]
    },
    {
    "text" : "Quelles sont les catégories de personnes qui meurent le plus du paludisme ?",
    "time": 15,
    "answers": [ 
            {
                "text" : "Les adultes",
                "comment": "Ce sont les enfants de moins de 5 ans et les femmes enceintes qui meurent le plus du paludisme.",
                "correct": false,
            },
            {
                "text" : "Les personnes âgées",
                "comment": "Ce sont les enfants de moins de 5 ans et les femmes enceintes qui meurent le plus du paludisme.",
                "correct": false,
            },
            {
                "text" : "Les enfants de moins de 5 ans et les femmes enceintes",
                "comment": "Il est donc important de protéger particulièrement ces populations.",
                "correct": true,
            },
            {
                "text" : "Les adolescents",
                "comment": "Ce sont les enfants de moins de 5 ans et les femmes enceintes qui meurent le plus du paludisme.",
                "correct": false,
            },
        ]
    },
    {
    "text" : "Pourquoi les enfants de moins de 5 ans et les femmes enceintes sont-ils les personnes qui meurent le plus du paludisme ?",
    "time": 15,
    "answers": [ 
            {
                "text" : "À cause de la nourriture qu’ils mangent",
                "comment": "C’est à cause d’un faible système de défense immunitaire. Le système de défense immunitaire des jeunes enfants n'est pas encore construit et celui des femmes enceintes est diminué par la grossesse.",
                "correct": false,
            },
            {
                "text" : "À cause d’un faible système de défense immunitaire",
                "comment": "Le système de défense immunitaire des jeunes enfants n'est pas encore construit et celui des femmes enceintes est diminué par la grossesse.",
                "correct": true,
            },
            {
                "text" : "À cause de la faiblesse physique",
                "comment": "C’est à cause d’un faible système de défense immunitaire. Le système de défense immunitaire des jeunes enfants n'est pas encore construit et celui des femmes enceintes est diminué par la grossesse.",
                "correct": false,
            },
        ]
    },
    {
    "text" : "Où dois-tu acheter les médicaments contre le paludisme prescrits par le médecin ?",
    "time": 15,
    "answers": [ 
            {
                "text" : "Chez les vendeurs ambulants",
                "comment": "Les vendeurs ambulants ne peuvent pas te garantir des médicaments de bonne qualité. Il faut les acheter dans une pharmacie.",
                "correct": false,
            },
            {
                "text" : "À la pharmacie",
                "comment": "Seules les pharmacies peuvent te garantir des médicaments de bonne qualité.",
                "correct": true,
            },
            {
                "text" : "Au marché, chez les vendeurs de médicaments",
                "comment": "Les vendeurs au marché ne peuvent pas te garantir des médicaments de bonne qualité. Il faut les acheter dans une pharmacie.",
                "correct": false,
            },
        ]
    },
]


/*
    {
    "text" : "",
    "time": 15,
    "answers": [ 
            {
                "text" : "",
                "comment": "",
                "correct": false,
            },
            {
                "text" : "",
                "comment": "",
                "correct": false,
            },
            {
                "text" : "",
                "comment": "",
                "correct": false,
            },
            {
                "text" : "",
                "comment": "",
                "correct": false,
            },
        ]
    },
*/
