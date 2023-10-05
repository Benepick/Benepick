import pandas as pd
from pyproj import Transformer

from pyproj import Proj, transform



카드데이터 = pd.read_csv("가게정보.csv", encoding="utf-8-sig", low_memory=False)
# NaN 값을 NULL로 변환
카드데이터 = 카드데이터.where(pd.notna(카드데이터), "")
df = pd.DataFrame(카드데이터)

proj_1 = Proj(init='epsg:2097')
proj_2 = Proj(init='epsg:4326')
df = df[df['좌표정보(x)'] != ""]
df = df[df['좌표정보(y)'] != ""]
converted = transform(proj_1, proj_2, df['좌표정보(x)'].values, df['좌표정보(y)'].values)
df['좌표정보(x)'] = converted[0]
df['좌표정보(y)'] = converted[1]

print(df)
df.to_csv("가게정보_converted.csv", index=False, encoding="utf-8-sig")