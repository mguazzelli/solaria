import json
from datetime import datetime

# Simulação de um artigo que extraímos do seu site antigo
# Em um cenário real, este dado viria do nosso web_extract
article_data = {
    "title": "A VERDADE CHOCANTE sobre os ADITIVOS ALIMENTARES: O que você come sem saber!",
    "author": "Invictus",
    "category": "Nutrição",
    "content_text": "Aqui entraria todo o texto extraído do site antigo...",
    "published_at": datetime.now().isoformat()
}

# Transformar para o formato que o Sanity espera
sanity_article = {
    "_type": "article",
    "title": article_data["title"],
    "slug": {"_type": "slug", "current": article_data["title"].lower().replace(" ", "-")},
    "author": article_data["author"],
    "category": article_data["category"],
    "publishedAt": article_data["published_at"],
    "content": [
        {
            "_type": "block",
            "children": [{"_type": "span", "text": article_data["content_text"]}]
        }
    ]
}

# Salvar como um arquivo JSON pronto para ser importado no Sanity
with open('migrated_article.json', 'w', encoding='utf-8') as f:
    json.dump(sanity_article, f, ensure_ascii=False, indent=2)

print("Artigo convertido com sucesso para: migrated_article.json")
