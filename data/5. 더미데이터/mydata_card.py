import csv
import random

import pandas as pd
from faker import Faker

fake = Faker()

# 사용자 정보를 읽어옴
user_data = []
with open('mydata_user.csv', 'r') as user_file:
    user_reader = csv.DictReader(user_file)
    for row in user_reader:
        user_data.append(row)

# 신용카드 이름을 읽어옴
credit_cards = []

with open('credit_cards.csv', 'r', encoding='utf-8-sig') as card_file:
    card_reader = csv.DictReader(card_file)
    for row in card_reader:
        credit_card = []
        print(row)
        credit_card.append(row["card_id"])
        credit_card.append(row["card_brand"])
        credit_cards.append(credit_card)
    credit_cards_df = pd.DataFrame(credit_cards, columns=["card_id", "card_brand"])
# 카드사 정보를 불러옴
card_brand_map = {}
with open('numbered_card_brand.csv', encoding='UTF-8-sig') as card_brand_file:
    card_brand_reader = csv.DictReader(card_brand_file)
    for row in card_brand_reader:
        card_brand_map[row["card_brand"]] = row["card_brand_id"]


def generate_dummy_card_serial():
    serial_parts = [f"{fake.random_int(min=0, max=9999):04d}" for _ in range(4)]
    card_serial = '-'.join(serial_parts)
    return card_serial

def generate_dummy_card_expiry():
    expiry_date = fake.credit_card_expire().split('/')
    expiry_month = expiry_date[0].zfill(2)  # 월을 2자리 숫자로 변환
    expiry_year = expiry_date[1][-2:]  # 뒤에서 2자리 연도로 변환
    card_expiry = f"{expiry_month}/{expiry_year}"
    return card_expiry

# 카드 정보 생성 및 CSV 파일에 저장
cards_data = []
for user in user_data:
    num_of_cards = random.randint(3, 6)
    for _ in range(num_of_cards):
        picked = random.choice([730, 2346, 115, 10, 45, 2354, 731, 2447, 657, 39])
        card = credit_cards_df[credit_cards_df["card_id"] == str(picked)]
        card_serial = generate_dummy_card_serial()  # 카드 시리얼번호 (임의의 카드 번호 생성)
        card_code = card["card_id"].values[0]  # 카드 이름 (임의의 카드 이름 생성)
        print(card_code)
        card_expiry = generate_dummy_card_expiry()  # 카드 유효기간 (임의의 유효기간 생성)
        prev_month_amount = random.randint(0, 1550000)
        ci = user['mydata_user_id']  # 사용자의 CI 가져옴
        # card_company_id = card_brand_map[card[1]]  # 카드사 ID (임의의 ID 생성)

        cards_data.append({
            'mydata_card_id': card_serial,
            'card_code': card_code,
            # 'mydata_card_name': card_name,
            'mydata_card_expiration_date': card_expiry,
            'mydata_user_id': ci,
            'prev_month_amount': prev_month_amount,
            # 'card_company_id': card_company_id
        })

# CSV 파일로 저장
with open('mydata_cards.csv', 'w', newline='', encoding="cp949") as cards_file:
    fieldnames = ['mydata_card_id', 'card_code', 'mydata_card_expiration_date', 'mydata_user_id', 'prev_month_amount']
    cards_writer = csv.DictWriter(cards_file, fieldnames=fieldnames)
    cards_writer.writeheader()
    cards_writer.writerows(cards_data)
    # print(cards_data)

print("CSV 파일 생성 완료")