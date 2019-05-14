import json
validSuburb = []

with open('sa3List.txt','r') as sa3:
    temp = sa3.read()
# print(temp)


with open('crimr_f.json','r') as assult:
    assultData = json.load(assult)
assult.close()



assultData = assultData['features']


sa3 = []
assult={}
# unemployment = []
homicide =[]
hom = {}
assult = []
ass = {}
arson =[]
ar = {}

# 1 - 149
# income_0 = []
# # 150 - 299
# income_1 =[]
# #  300 - 399
# income_2 =[]
# #  400 - 499
# income_3 =[]
# #  500 - 649
# income_4 =[]
# #  650 - 799
# income_5 =[]
# #  800 - 999
# income_6 =[]
# #  1000 - 1249:
# income_7 =[]
# #  1250 - 1499 :
# income_8 =[]
# #  1500 - 1749 :
# income_9 =[]
# #  1750 - 1999 :
# income_10 =[]
# #  2000 - 2999 :
# income_11 = []
# #  3000 -
# income_12 =[]
# #  0 income:
# income_13 =[]

# # Clerical and administrative workers
# job1 =[]
# # Community and personal service workers\
# job2 =[]
# # Inadequately described Not stated
# job3 =[]
# # Labourers
# job4 =[]
# # Machinery operators and drivers
# job5 =[]
# # Managers
# job6 =[]
# # Professionals
# job7 =[]
# # Sales workers
# job8 =[]
# # Technicians and trades workers
# job9 =[]
# # Total personal income not stated Total
# job10 =[]

# burg = []
# waist = []
# overweight = []
# stress = []
# bloodPress =[]
# drink = []
# homeless = []

# sexual_offences = []
# stalking = []
# robbery = []

# theft = []

for item in assultData:
    # print(item['properties']['lga_name'])
    if item['properties']['lga_name11']:
        name = item['properties']['lga_name11'].split('(')[0]
    # print(name)
    if name in temp:
        # print(name," is in the list")
        sa3.append(name)

        pop = item['properties']['lga_erp']

        a10 = item['properties']['a10']
        if a10:
            hom[item['properties']['lga_name11'].split('(')[0]]=(item['properties']['a10'])
            homicide.append(round(a10/pop,4)*100)
        else:
            hom[item['properties']['lga_name11'].split('(')[0]]=None
            homicide.append(None)

        a20 = item['properties']['a20']
        ass[item['properties']['lga_name11'].split('(')[0]]=(item['properties']['a20'])
        assult.append(round(a20/pop,3)*100)

        b10 = item['properties']['b10']
        if b10:
            ar[item['properties']['lga_name11'].split('(')[0]]=(item['properties']['b10'])
            arson.append(round(b10/pop,3)*100)
        else:
            ar[item['properties']['lga_name11'].split('(')[0]]=None
            arson.append(None)

        # unemployment.append(item['properties']['unemploymnt_3_percent'])
        # job1.append(item['properties']['tot_pins_claw']+item['properties']['tot_tot_claw'])
        # job2.append(item['properties']['tot_pins_copsw'] + item['properties']['tot_tot_copsw'])
        # job3.append(item['properties']['tot_pins_idns'] + item['properties']['tot_tot_idns'])
        # job4.append(item['properties']['tot_pins_lab'] + item['properties']['tot_tot_lab'])
        # job5.append(item['properties']['tot_pins_maopdv'] + item['properties']['tot_tot_maopdv'])
        # job6.append(item['properties']['tot_pins_mng'] + item['properties']['tot_tot_mng'])
        # job7.append(item['properties']['tot_pins_pro'] + item['properties']['tot_tot_pro'])
        # job8.append(item['properties']['tot_pins_swks'] + item['properties']['tot_tot_swks'])
        # job9.append(item['properties']['tot_pins_tectw'] + item['properties']['tot_tot_tectw'])
        # job10.append(item['properties']['tot_pins_tot'] + item['properties']['tot_tot_tot'])
        # income_0.append(item['properties']['tot_1_149_tot'])
        # income_1.append(item['properties']['tot_150_299_tot'])
        # income_2.append(item['properties']['tot_300_399_tot'])
        # income_3.append(item['properties']['tot_400_499_tot'])
        # income_4.append(item['properties']['tot_500_649_tot'])
        # income_5.append(item['properties']['tot_650_799_tot'])
        # income_6.append(item['properties']['tot_800_999_tot'])
        # income_7.append(item['properties']['tot_1000_1249_tot'])
        # income_8.append(item['properties']['tot_1250_1499_tot'])
        # income_9.append(item['properties']['tot_1500_1749_tot'])
        # income_10.append(item['properties']['tot_1750_1999_tot'])
        # income_11.append(item['properties']['tot_2000_2999_tot'])
        # income_12.append(item['properties']['tot_3000mo_tot'])
        # income_13.append(item['properties']['tot_nni_tot'])
        # homicide.append(item['properties']['a10_homicide__and__related_offences'])
        # waist.append(item['properties']['est_ppl_18yrs_plus_wst_meas_ind_rsk_dis_2014_15_asr_100'])
        # overweight.append(item['properties']['est_ppl_18yrs_plus_ovrwht_2014_15_asr_100'])
        # stress.append(item['properties']['est_ppl_18yrs_plus_hi_psyc_strs_k10_scal_2014_15_asr_100'])
        # bloodPress.append(item['properties']['est_ppl_18yrs_plus_hi_blood_pressure_2014_15_asr_100'])
        # drink.append(item['properties']['est_ppl_18yrs_plus_wst_meas_ind_rsk_dis_2014_15_asr_100'])
        # homeless.append(item['properties']['hl_p_homeless_tot'])
        # assult.append(item['properties']['a20_assault__and__related_offences'])
        # sexual_offences.append(item['properties']['a30_sexual_offences'])
        # stalking.append(item['properties']['a70_stalking_harassment__and__threatening_behaviour'])
        # arson.append(item['properties']['b10_arson'])
        # theft.append(item['properties']['b40_theft'])
        # robbery.append(item['properties']['a50_robbery'])
        # burg.append(item['properties']['b30_burglary_break__and__enter'])
# as_per =[]
# for key,value in assult.items():
#     for key2,value2 in poplation.items():
#         if key == key2:
#             print(key2)
#             new_item = (value/value2) * 100
#             as_per.append(new_item)


print(sa3)
print(homicide)
print(hom)
print(assult)
print(ass)
print(arson)
print(ar)
# print(unemployment)
# print(job1)
# print(sa3)
# print(job2)
# print(sa3)
# print(job3)
# print(sa3)
# print(job4)
# print(sa3)
# print(job5)
# print(sa3)
# print(job6)
# print(sa3)
# print(job7)
# print(sa3)
# print(job8)
# print(sa3)
# print(job9)
# print(sa3)
# print(job10)


# print(sa3)
# print(income_0)
# print(sa3)
# print(income_1)
# print(sa3)
# print(income_2)
# print(sa3)
# print(income_3)
# print(sa3)
# print(income_4)
# print(sa3)
# print(income_5)
# print(sa3)
# print(income_6)
# print(sa3)
# print(income_7)
# print(sa3)
# print(income_8)
# print(sa3)
# print(income_9)
# print(sa3)
# print(income_10)
# print(sa3)
# print(income_11)
# print(sa3)
# print(income_12)
# print(sa3)
# print(income_13)

# print(waist)
# print(sa3)
# print(overweight)
# print(sa3)
# print(stress)
# print(sa3)
# print(bloodPress)
# print(sa3)
# print(drink)

# print(homeless)
# print(assult)
# print(sa3)
# print(sexual_offences)
# print(sa3)
# print(stalking)
# print(sa3)
# print(arson)
# print(sa3)
# print(theft)
# print(sa3)
# print(robbery)





