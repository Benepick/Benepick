import random
import uuid
import pandas as pd
from datetime import datetime, timedelta

BASE_URL = "C:\\Users\\SSAFY\\Desktop\\로컬\\"

category = ["온라인", "쇼핑", "생활",  "식비", "여가", "카페/간식", "편의점"]

cate_dict = {
    "온라인": ["온라인","간편결제", "교통", "배달", "공과금", "스트리밍", "통신"],
    "쇼핑": ["대형마트", "백화점", "뷰티", "아울렛"],
    "생활": ["병원", "약국", "주유소"],
    "카페/간식": ["카페"],
    "식비": ["일반음식점", "휴게음식점", "패밀리레스토랑"],
    "여가": ["헬스장", "영화"],
    "편의점": ["편의점"]
}


# mydata_cards = pd.read_csv("C:\\Users\\SSAFY\\Desktop\\더미데이터\\mydata_cards.csv", encoding="cp949")
mydata_cards = pd.read_csv("C:\\Users\\SSAFY\\Desktop\\더미데이터\\우리들_카드.csv", encoding="cp949")
mydata_cards_df = pd.DataFrame(mydata_cards)

card_benefit = pd.read_csv(BASE_URL+"card_benefit.csv", encoding="UTF-8")
card_benefit_df = pd.DataFrame(card_benefit)
card_benefit_df = card_benefit[~card_benefit["CARD_ID"].isna()]
card_benefit_df["CARD_ID"] = card_benefit_df["CARD_ID"].astype(int)

local_data = pd.read_csv(BASE_URL+"local\\가게정보.csv",encoding="UTF-8")
local_df = pd.DataFrame(local_data)
local_df.loc[local_df["개방서비스명"]=="편의점", "업태구분명"] = "편의점"

data_dict = {
    "대형마트": local_df[local_df["업태구분명"] == "대형마트"],
    "백화점": local_df[local_df["업태구분명"] == "백화점"],
    "뷰티": local_df[local_df["업태구분명"] == "뷰티"],
    "아울렛": local_df[local_df["업태구분명"] == "아울렛"],
    "병원": local_df[local_df["업태구분명"] == "병원"],
    "약국": local_df[local_df["업태구분명"] == "약국"],
    "주유소": local_df[local_df["업태구분명"] == "주유소"],
    "일반음식점": local_df[local_df["업태구분명"] == "일반음식점"],
    "휴게음식점": local_df[local_df["업태구분명"] == "휴게음식점"],
    "패밀리레스토랑": local_df[local_df["업태구분명"] == "패밀리레스토랑"],
    "헬스장": local_df[local_df["업태구분명"] == "헬스장"],
    "영화": local_df[local_df["업태구분명"] == "영화"],
    "편의점": local_df[local_df["업태구분명"] == "편의점"],
    "온라인": local_df[local_df["업태구분명"] == "온라인"],
    "간편결제": local_df[local_df["업태구분명"] == "온라인(간편결제)"],
    "교통": local_df[local_df["업태구분명"] == "교통"],
    "배달": local_df[local_df["업태구분명"] == "배달"],
    "공과금": local_df[local_df["업태구분명"] == "공과금"],
    "스트리밍": local_df[local_df["업태구분명"] == "스트리밍"],
    "통신": local_df[local_df["업태구분명"] == "통신"],
}

print(card_benefit_df.head())

def generate_dummy_id():
    return str(uuid.uuid4())

def generate_dummy_payment_amount():
    return random.randint(3, 50) * 1000

# 시작 날짜와 종료 날짜 설정 (예: 최근 1년)
start_date = datetime.now() - timedelta(days=120)
end_date = datetime.now()

# card_benefit
# mydata_cards_df
# local_df["업태구분명"].unique()
card_benefit_df[(card_benefit_df["CARD_ID"] == 730) & (card_benefit_df["카테고리"]=="온라인")]
# local_data["업태구분명"]


def get_benefit_percent(amount, df):
    for index, row in df.iterrows():
        if pd.isna(row['실적구간']):
            return row["1회당 할인율"]
        실적구간 = row["실적구간"].lstrip("[").rstrip("]").split(",")
        if amount >= int(실적구간[0])/10 and amount <= int(실적구간[1])/10:
            return row["1회당 할인율"]
    return 0


payment_dummies = []
for index, card_serial in mydata_cards_df.iterrows():

    for i in range(random.randint(0, 100)):
        payment_id = generate_dummy_id()
        payment_date = start_date + timedelta(days=random.randint(0, 120), minutes=random.randint(0, 1440))
        payment_date = payment_date.strftime('%Y-%m-%d %H:%M')
        mydata_card_id = card_serial["mydata_card_id"]
        card_code = card_serial["card_code"]
        prev_month_amount = card_serial["prev_month_amount"]

        amount = generate_dummy_payment_amount()

        category1 = random.choice(category)
        category2 = random.choice(cate_dict[category1])

        받은혜택금액 = 0

        card_benefits = card_benefit_df[(card_benefit_df["CARD_ID"] == card_code)]
        카테고리 = card_benefits[card_benefits["카테고리"] == category1]
        카테고리1 = 카테고리[카테고리["카테고리.1"] == category2]
        거래지점 = local_df[local_df["업태구분명"] == category2].sample(1).values[0]

        if len(카테고리1) != 0:

            if len(카테고리1["소분류"].unique()) == 0 or 카테고리1["소분류"].isna().any():
                받은혜택금액 = amount * get_benefit_percent(prev_month_amount, 카테고리1) / 100

            if len(카테고리1) != 0:
                소분류 = 카테고리1[카테고리1["소분류"] == 거래지점[-1]]
                if len(소분류) != 0:
                    받은혜택금액 = amount * get_benefit_percent(prev_month_amount, 소분류) / 100

        payment_dummies.append(
            [payment_id, mydata_card_id, payment_date, card_code, category1, category2, amount, 받은혜택금액, 거래지점[2]])

payment_df = pd.DataFrame(payment_dummies, columns=["mydata_payment_id", "mydata_card_id", "mydata_payment_date","card_code", "mydata_payment_category1", "mydata_payment_category2", "mydata_payment_amount", "mydata_recieved_benefit", "mydata_payment_merchant_info"])