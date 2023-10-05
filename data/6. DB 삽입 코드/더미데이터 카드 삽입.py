import mysql.connector
import pandas as pd
from datetime import datetime


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
INSERT INTO mydata_card (mydata_card_id, card_code, mydata_card_expiration_date, mydata_user_id, mydata_card_prev_month_amount)
VALUES (%s, %s, %s, %s, %s)
"""

## 데이터 호출

# 카드데이터 = pd.read_csv("mydata_cards.csv", encoding="cp949")
카드데이터 = pd.read_csv("우리들_카드.csv", encoding="cp949")
print(카드데이터)
# 데이터프레임을 순회하며 데이터를 삽입
for index, row in 카드데이터.iterrows():
    if len(row["mydata_card_expiration_date"]) == 5:
        row["mydata_card_expiration_date"] = datetime.strptime(row["mydata_card_expiration_date"], '%m/%y').strftime('%Y-%m') + "-01"
    data = (row["mydata_card_id"], row["card_code"], row["mydata_card_expiration_date"], row["mydata_user_id"], row["prev_month_amount"])
    print(data)
    cursor.execute(insert_query, data)

# 변경사항을 커밋
conn.commit()
#
# # 연결 종료
cursor.close()
conn.close()