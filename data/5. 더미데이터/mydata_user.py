import csv
from faker import Faker
import random
import hashlib

def generate_dummy_id(name, ssn, phone):
    splited_ssn = ssn.split('-')
    user_info = name + splited_ssn[0] + splited_ssn[1][:1] + phone
    # hashlib을 사용하여 SHA-256 해시 생성
    hash_object = hashlib.sha256(user_info.encode())
    hashed_code = hash_object.hexdigest()
    return hashed_code


def generate_dummy_name_and_gender():
    first_name = fake.first_name()
    last_name = fake.last_name()

    # 0: 남성, 1: 여성
    gender = random.choice([0, 1])

    return first_name, last_name, gender

def generate_dummy_social(gender):
    birth_date = fake.date_of_birth(minimum_age=18, maximum_age=80).strftime('%y%m%d')

    # 주민등록번호 뒷자리: 1-3: 출생지 정보, 4-6: 출생 순서 및 성별 정보, 7: 검증 코드

    if birth_date[0] != "0":
        random_numbers = ("1" if gender == 0 else "2") + str(fake.random_int(min=100000, max=999999))
    else:
        random_numbers = ("3" if gender == 0 else "4") + str(fake.random_int(min=100000, max=999999))

    social = f"{birth_date}-{random_numbers}"
    return social

def generate_dummy_phone_number():
    second_part = fake.random_int(min=1000, max=9999)  # 두 번째 자리: 4자리 랜덤 수
    phone_number = f"010{second_part}{fake.random_int(min=1000, max=9999)}"  # 맨 앞 3자리는 010, 나머지 4자리는 랜덤
    return phone_number

# 더미 데이터 생성을 위한 Faker 객체 생성 (한국어로 설정)
fake = Faker('ko_KR')

# 생성할 더미 데이터 수
num_records = 100

# 더미 데이터 생성 및 CSV 파일로 저장
with open('mydata_user.csv', 'w', newline='', encoding='cp949') as csvfile:
    fieldnames = ['mydata_user_id', 'mydata_name', 'mydata_social_number', 'mydata_phone_number']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    for _ in range(num_records):
        name = fake.name()
        ssn = generate_dummy_social(random.choice([0, 1]))
        phone = generate_dummy_phone_number()
        row = {
            'mydata_user_id': generate_dummy_id(name, ssn, phone),
            'mydata_name': name,
            'mydata_social_number': ssn,
            'mydata_phone_number': phone,
        }
        writer.writerow(row)

print("한국인 더미 데이터 생성 및 CSV 파일 저장 완료.")

