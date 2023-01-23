import requests
import xml.etree.cElementTree as et
import json

path_nums_file = "./votes-number"


date_code = "269"
vote_code = "967"
descrition_code = "245"

if __name__ == "__main__":

    with open(path_nums_file) as f:
        vote_date = ""
        vote_descrition = ""
        line_list = f.readlines()
        line_list = map(lambda x: x.replace("\n", ""), line_list)
        all_data = []
        i = 0

        for num in line_list:
            i+=1
            if '#' in num:
                continue
            print(f'loop: {i}')
            url = f"https://digitallibrary.un.org/record/{num}/export/xm"
            req = requests.get(url)
            text = req.text.replace(
                """<?xml version="1.0" encoding="UTF-8"?>
<collection xmlns="http://www.loc.gov/MARC21/slim">""",
                "<collection>",
            )

            tree = et.fromstring(text)
            vote_list = {}

            for el in tree.findall("record"):
                for ch in list(el):
                    tag = ch.attrib["tag"]
                    if tag == date_code:
                        vote_date = list(ch)[0].text
                    elif tag == descrition_code:
                        vote_descrition = list(ch)[0].text
                    elif tag == vote_code:
                        country_code = ""
                        vote = ""
                        for subfield in list(ch):
                            if subfield.attrib["code"] == "c":
                                country_code = subfield.text
                            elif subfield.attrib["code"] == "d":
                                vote = subfield.text
                        vote_list[country_code] = vote
            meta = {
                "date": vote_date,
                "descrition": vote_descrition,
                "israel": vote_list["ISR"],
            }
            all_data += [{"meta": meta, "votes": vote_list}]
        data_string = json.dumps(all_data)
        with open("data_votes.json", "w") as file1:
            file1.write(data_string)
