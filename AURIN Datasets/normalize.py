
name1 = ['Banyule', 'Bayside', 'Boroondara', 'Brimbank', 'Casey', 'Darebin', 'Frankston', 'Hobsons Bay', 'Hume', 'Kingston', 'Knox', 'Manningham ', 'Maribyrnong', 'Maroondah', 'Melbourne', 'Melton ', 'Monash', 'Moonee Valley', 'Moreland', 'Nillumbik', 'Port Phillip', 'Queenscliffe', 'Stonnington', 'Whitehorse', 'Whittlesea', 'Wyndham', 'Yarra', 'Yarra Ranges', 'Glen Eira', 'Greater Geelong', 'Mornington']
arson = [34, 12, 18, 102, 172, 58, 95, 32, 180, 53, 39, 17, 18, 35, 55, 85, 29, 31, 42, 15, 36, 1, 9, 28, 78, 91, 55, 67, 26, 160,88]
assault = [631, 323, 395, 1514, 2345, 847, 1211, 497, 1698, 754, 834, 363, 573, 664, 3039, 931, 725, 610, 1010, 192, 871, 8, 615, 606, 1380, 1235, 838, 725, 548, 1596,825]
homicide =[2, 2, 2, 12, 11, 5, 2, 2, 6, 7, 2, 2, 6, None, 46, 4, 2, 2, 8, 2, 2, None, 2, 5, 2, 5, 2, 4, 5, 7,5]
burg = [1080, 740, 1097, 1627, 2218, 1718, 1099, 554, 2076, 974, 1051, 747, 790, 570, 1888, 1145, 1495, 833, 1476, 348, 1166, 44, 960, 1026, 1554, 1511, 1283, 651, 892, 2720,1389]

name2 = ['Banyule', 'Bayside', 'Boroondara', 'Brimbank', 'Casey', 'Darebin', 'Frankston', 'Hobsons Bay', 'Hume', 'Kingston', 'Knox', 'Manningham ', 'Maribyrnong', 'Maroondah', 'Melbourne', 'Melton ', 'Monash', 'Moonee Valley', 'Moreland', 'Greater Geelong', 'Nillumbik', 'Glen Eira', 'Port Phillip', 'Queenscliffe', 'Stonnington', 'Whitehorse', 'Whittlesea', 'Wyndham', 'Yarra', 'Yarra Ranges', 'Mornington']
pop = [127693, 102737, 177361, 205741, 313521, 155022, 139511, 93392, 207830, 159023, 160665, 122902, 87355, 114979, 148039, 141749, 192850, 122968, 172091, 238603, 64280, 149012, 108558, 2904, 111606, 170093, 207881, 228088, 93380, 155312, 160862]

pop_dict = {}
arson_dict = {}
assault_dict = {}
homicide_dict = {}
burg_dict = {}

for item in range(0,len(name2)):
    pop_dict[name2[item]] = pop[item]
    arson_dict[name1[item]] = arson[item]
    assault_dict[name1[item]] = assault[item]
    homicide_dict[name1[item]] = homicide[item]
    burg_dict[name1[item]] = burg[item]

arson_dict2 = {}
assault_dict2 = {}
homicide_dict2 = {}
burg_dict2 = {}

arson2 = []
assualt2 = []
homicide2 = []
burg2 = []

for key,value in pop_dict.items():
    arson_dict2[key] = round((arson_dict[key] / value) * 100,3)
    arson2.append(round((arson_dict[key] / value) * 100,3))
    assault_dict2[key] = round((assault_dict[key] / value ) *100,3)
    assualt2.append(round((assault_dict[key] / value ) *100,3))
    if homicide_dict[key] != None:
        homicide_dict2[key] = round((homicide_dict[key] / value) * 100,3)
    else:
        homicide_dict2[key] = None
    homicide2.append(homicide_dict2[key])
    burg_dict2[key] = round((burg_dict[key] / value ) * 100,3)
    burg2.append(burg_dict2[key])
print(arson_dict2)
print(assault_dict2)
print(homicide_dict2)
print(burg_dict2)

print("111111111111")
print(arson2)
print(assualt2)
print(homicide2)
print(burg2)
