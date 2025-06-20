# pip install googletrans==4.0.0-rc1

import requests
from bs4 import BeautifulSoup
import os
import json
import csv
from googletrans import Translator
from time import sleep

translator = Translator()

CATEGORY_LINKS = {
    "sleep": [
        "https://edition.cnn.com/2025/03/24/health/sleep-better-socks-wellness",
        "https://edition.cnn.com/2025/06/05/health/importance-of-exercise-sleep-wellness",
        "https://edition.cnn.com/2025/04/08/health/cognitive-shuffling-sleep-technique-benefits-wellness",
        "https://edition.cnn.com/2025/03/15/health/nightcap-alcohol-before-bed-sleep-wellness"
    ],
    "health": [
        "https://edition.cnn.com/2025/03/28/health/extreme-wellness-challenges-perfection",
        "https://edition.cnn.com/2025/03/27/health/heated-workout-hot-yoga-wellness",
        "https://edition.cnn.com/2025/05/23/health/recovery-days-training-wellness",
        "https://edition.cnn.com/2025/04/17/health/walking-speed-afib-arrhythmia-study-wellness"
    ],
    "food": [
        "https://edition.cnn.com/2025/06/02/health/coffee-longevity-women-study-wellness",
        "https://edition.cnn.com/2025/04/25/health/how-to-cook-tofu-wellness",
        "https://edition.cnn.com/2025/05/29/health/breakfast-cereal-children-nutrition-wellness",
        "https://edition.cnn.com/2025/05/07/health/ultraprocessed-food-parkinsons-disease-wellness"
    ]
}

def translate_text(text):
    try:
        result = translator.translate(text, src='en', dest='zh-tw')
        sleep(1)  # 延遲避免封鎖
        return result.text
    except Exception as e:
        print("翻譯失敗，回傳原文。", e)
        return text

def get_article(link):
    try:
        res = requests.get(link)
        soup = BeautifulSoup(res.text, "html.parser")

        title_en = soup.select_one("h1, h2")
        title_en = title_en.text.strip() if title_en else "Untitled"
        title_zh = translate_text(title_en)

        paras = soup.select("div.article__content p") or soup.select("article p")
        content_en = "\n".join(p.get_text(strip=True) for p in paras[:3]) or "No content available"
        content_zh = translate_text(content_en)

        return {
            "title_en": title_en,
            "title_zh": title_zh,
            "link": link,
            "content_en": content_en,
            "content_zh": content_zh
        }

    except Exception as e:
        print(f"抓取失敗：{link}\n{e}")
        return None

def save_articles(articles, category_name):
    output_dir = os.path.join(os.path.dirname(__file__), "..", "..", "public")
    os.makedirs(output_dir, exist_ok=True)

    json_path = os.path.join(output_dir, f"cnn_{category_name}_articles.json")
    csv_path = os.path.join(output_dir, f"cnn_{category_name}_articles.csv")

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(articles, f, ensure_ascii=False, indent=2)

    with open(csv_path, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["英文標題", "中文標題", "連結", "英文內文", "中文內文"])
        for a in articles:
            writer.writerow([a["title_en"], a["title_zh"], a["link"], a["content_en"], a["content_zh"]])

    print(f"{category_name} 已儲存 {len(articles)} 筆文章")
    print(f"JSON：{json_path}")
    print(f"CSV ：{csv_path}")

def main():
    for category, links in CATEGORY_LINKS.items():
        print(f"\n📘 正在抓取分類：{category}")
        articles = []
        for link in links:
            article = get_article(link)
            if article:
                articles.append(article)
        save_articles(articles, category)

if __name__ == "__main__":
    main()
