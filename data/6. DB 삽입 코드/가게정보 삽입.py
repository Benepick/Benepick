import pandas as pd
import mysql.connector

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
INSERT INTO merchant (merchant_name, merchant_category1, merchant_category2, merchant_category3, merchant_x, merchant_y)
VALUES (%s, %s, %s, %s, %s, %s)
"""

카드데이터 = pd.read_csv("가게정보_converted.csv", encoding="utf-8-sig", low_memory=False)

# NaN 값을 NULL로 변환
카드데이터 = 카드데이터.where(pd.notna(카드데이터), "")

# 좌표 변환 함수 정의 (EPSG:2097에서 WGS 84로 변환)

print(카드데이터)

batch_size = 10000  # 배치 크기 설정
cnt = 0
batch = []

# 데이터프레임을 순회하며 데이터를 삽입
for index, row in 카드데이터.iterrows():
    if row["좌표정보(x)"] == '' or row["좌표정보(y)"] == '':
        continue
    data = (row["사업장명"], row["개방서비스명"], row["업태구분명"], row["소분류"], float(row["좌표정보(x)"]) + 0.0030807871381, float(row["좌표정보(y)"]) + 0.00006870073772)
    batch.append(data)
    cnt += 1
    if cnt % batch_size == 0:
        # 배치 크기에 도달하면 배치를 데이터베이스에 삽입하고 커밋
        cursor.executemany(insert_query, batch)
        conn.commit()
        batch = []  # 배치 초기화
        print(f"{cnt} 건 처리 완료")

# 남은 데이터를 삽입하고 커밋
if batch:
    cursor.executemany(insert_query, batch)
    conn.commit()

# 연결 종료
cursor.close()
conn.close()
