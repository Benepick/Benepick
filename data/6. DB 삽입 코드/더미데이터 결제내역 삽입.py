from datetime import datetime

import mysql.connector
import pandas as pd

# MySQL 서버 연결 설정
db_config = {
    "host": "j9a610.p.ssafy.io",
    "user": "benepick",
    "password": "benepick",
    "database": "benepick_bank",
}

# MySQL 서버에 연결
conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()

# 더미 데이터 생성 및 삽입 쿼리
insert_query = """
INSERT INTO mydata_payment (mydata_payment_id, mydata_card_id, mydata_payment_date, mydata_payment_card_code, mydata_payment_category1, mydata_payment_category2, mydata_payment_amount, mydata_payment_received_benefit_amount, mydata_payment_merchant_name)
VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
"""

## 데이터 호출

# 카드데이터 = pd.read_csv("mydata_payment.csv", encoding="utf-8")
카드데이터 = pd.read_csv("우리들_결제내역.csv", encoding="utf-8")
# NaN 값을 NULL로 변환
카드데이터 = 카드데이터.where(pd.notna(카드데이터), "")

print(카드데이터)
# 데이터프레임을 순회하며 데이터를 삽입
for index, row in 카드데이터.iterrows():
    print(row["mydata_payment_id"])
    print(row["mydata_payment_date"])
    row["mydata_payment_date"] = datetime.strptime(row["mydata_payment_date"], '%Y-%m-%d %H:%M')
    data = (row["mydata_payment_id"], row["mydata_card_id"], row["mydata_payment_date"], row["card_code"], row["mydata_payment_category1"], row["mydata_payment_category2"], row["mydata_payment_amount"], row["mydata_recieved_benefit"], row["mydata_payment_merchant_info"])
    cursor.execute(insert_query, data)


# 변경사항을 커밋
conn.commit()
#
# # 연결 종료
cursor.close()
conn.close()