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
INSERT INTO mydata_user (mydata_user_id, mydata_user_name, mydata_user_social_number, mydata_user_phone_number)
VALUES (%s, %s, %s, %s)
"""

## 데이터 호출

# 카드데이터 = pd.read_csv("mydata_user.csv", encoding="cp949")
카드데이터 = pd.read_csv("우리들.csv", encoding="cp949")
print(카드데이터)
# 데이터프레임을 순회하며 데이터를 삽입
for index, row in 카드데이터.iterrows():
    data = (row["mydata_user_id"], row["mydata_name"], row["mydata_social_number"], row["mydata_phone_number"])
    cursor.execute(insert_query, data)

# 변경사항을 커밋
conn.commit()
#
# # 연결 종료
cursor.close()
conn.close()