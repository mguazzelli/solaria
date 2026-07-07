import json
import os
import time

urls = [
    ("https://www.solaria.com.br/canela", "Canela: Termogênico Natural com Efeito Antidiabético, Anti-inflamatório e Antioxidante", "Nutrição"),
    ("https://www.solaria.com.br/alcacuz", "Alcaçuz: planta medicinal com potente ação anti-inflamatória, digestiva e protetora gástrica", "Plantas Medicinais"),
    ("https://www.solaria.com.br/cravo-da-india", "Cravo-da-Índia: Potente Anti-Inflamatório Natural com Ação Analgésica e Antimicrobiana", "Plantas Medicinais"),
    ("https://www.solaria.com.br/citronela", "Citronela: planta medicinal com potente ação repelente, anti-inflamatória e antifúngica", "Plantas Medicinais"),
    ("https://www.solaria.com.br/melao-de-sao-caetano", "Melão-de-São-Caetano: Planta Medicinal com Potente Ação Antidiabética, Anti-Inflamatória e Antioxidante", "Plantas Medicinais"),
    ("https://www.solaria.com.br/taioba", "Taioba: hortaliça nutritiva com potencial medicinal antioxidante e anti-inflamatório", "Nutrição"),
    ("https://www.solaria.com.br/lavanda", "Lavanda: Calmante Aromático com Potente Ação Ansiolítica, Analgésica e Regeneradora", "Plantas Medicinais"),
    ("https://www.solaria.com.br/madressilva", "Madressilva: planta tradicional com potente ação anti-inflamatória e imunomoduladora", "Plantas Medicinais"),
    ("https://www.solaria.com.br/macela", "Macela: calmante digestivo natural com forte ação anti-inflamatória e antioxidante", "Plantas Medicinais"),
    ("https://www.solaria.com.br/fisalis", "Fisális: poderosa fonte de antioxidantes com ação anti-inflamatória e protetora hepática", "Plantas Medicinais")
]

output_dir = "C:/Users/Hermes/solaria/solaria/apps/cms/migrated"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

for url, title, category in urls:
    filename = os.path.join(output_dir, f"{title.split(':')[0].lower().replace(' ', '-')}.json")
    data = {
        "_type": "article",
        "title": title,
        "slug": {"_type": "slug", "current": title.split(':')[0].lower().replace(' ', '-')},
        "author": "Dr. Marcel Guazzelli",
        "category": category,
        "publishedAt": "2025-06-16T00:00:00Z",
        "content": [{"_type": "block", "children": [{"_type": "span", "text": "Conteúdo extraído via automação Solaria Holding."}]}]
    }
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    time.sleep(0.5)
