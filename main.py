import json
import pandas as pd
import matplotlib.pyplot as plt


countries = {}
with open('./data_votes.json') as f:
    data = json.load(f)
    countries = data['countries']

def edit_vote(vote):
    israel = vote['meta']['israel']
    type_res = {
        'N': 2,
        'A': 1,
        '': -1,
        'Y': 0
    }
    if israel == 'Y':
        type_res = {
            'N': 0,
            'A': 1,
            '': -1,
            'Y': 2
        }
    vote_list = vote['votes']
    res = {}
    for country_code in vote_list.keys():
        res[countries[country_code]] = type_res[vote_list[country_code]]
    return res


if __name__ == '__main__':
    with open('./data_votes.json') as f:
        data = json.load(f)
        countries = data['countries']
        ld = list(map(lambda x:x['meta']['descrition'],data['votes']))
        for d in ld:
            print(d)
        votes = map(edit_vote,data['votes'])
        date_list = map( lambda x:x['meta']['date'],data['votes'])
        df_votes = pd.DataFrame(votes, index=date_list)
        df_summary = pd.DataFrame(df_votes)
        
        df_summary['good'] = df_summary[lambda x: x == 2].count(axis=1)
        df_summary['netral'] = df_summary[lambda x: x == 1].count(axis=1)
        df_summary['bad'] = df_summary[lambda x: x == 0].count(axis=1)
        # print(df_summary[['good', 'netral', 'bad']].to_string())
        df_summary[['good', 'netral', 'bad']].iloc[::-1].plot()
        # plt.show()




