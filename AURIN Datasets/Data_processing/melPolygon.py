import json
import csv
# import numpy as np
# with open('sa3List.txt','r') as sa3:
#     temp = sa3.read()
temp = ['Banyule ', 'Bayside ', 'Boroondara ', 'Brimbank ', 'Casey ', 'Darebin ', 'Frankston ', 'Hobsons Bay ', 'Hume ', 'Kingston ', 'Knox ', 'Manningham ', 'Maribyrnong ', 'Maroondah ', 'Melbourne ', 'Melton ', 'Monash ', 'Moonee Valley ', 'Moreland ', 'Nillumbik ', 'Port Phillip ', 'Queenscliffe ', 'Stonnington ', 'Whitehorse ', 'Whittlesea ', 'Wyndham ', 'Yarra ', 'Yarra Ranges ', 'Glen Eira ', 'Greater Geelong ']
with open('crime.json','r') as mel:
    polygon = json.load(mel)
mel.close()

gla_code = []
result = {}
name_list = []
for item in polygon['features']:
    name = item['properties']['feature_name'].split('(')[0]
    print(name)
    if name in temp:
        gla_code.append(item['properties']['feature_code'])
        print(name," is in the list")
        name_list.append(name)
        result[name]=[item['geometry']['coordinates']]
size = len(name_list)

result2 = {}
new_name = []

for item in temp:
    print(item)
    new_name.append(item)
    result2[item] = result[item]


# print(size)
#
# print(gla_code)
# print(name_list)
fieldnames = ['lga','coor']


with open('mel_polygen.json','w') as meb_poly :
    meb_poly.write(json.dumps(result2))
    # writer = csv.writer(meb_poly)
    # writer.writerow('1'+'\t'+'2')
    # for key,value in result.items():
    #     # meb_poly.write( str(key) + '\t')
    #     meb_poly.write( str(key) + '\t' + str(value) + '\n' )
