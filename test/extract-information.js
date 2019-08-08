const testCases = [
    [
        "Tracklist\n1 | Creek    (00:00)\n2 | Feel       (06:02)\n3 | Sheep   (10:36)\n4 | Sleep    (16:08)\n5 | Green    (22:58)\n6 | Feet       (28:20)\n7 | Street    (34:49)\n8 | Teevee  (42:19)\n\nLovely Japanese minimal ambient album. Very relaxing and a personal favorite of mine, decided to upload because no full version existed on YT.",
        [
            {
                "number": "1",
                "title": "Creek",
                "timeString": "00:00",
                "time": 0
            },
            {
                "number": "2",
                "title": "Feel",
                "timeString": "06:02",
                "time": 362
            },
            {
                "number": "3",
                "title": "Sheep",
                "timeString": "10:36",
                "time": 636
            },
            {
                "number": "4",
                "title": "Sleep",
                "timeString": "16:08",
                "time": 968
            },
            {
                "number": "5",
                "title": "Green",
                "timeString": "22:58",
                "time": 1378
            },
            {
                "number": "6",
                "title": "Feet",
                "timeString": "28:20",
                "time": 1700
            },
            {
                "number": "7",
                "title": "Street",
                "timeString": "34:49",
                "time": 2089
            },
            {
                "number": "8",
                "title": "Teevee",
                "timeString": "42:19",
                "time": 2539
            }
        ]
    ],
    [
        "0:00 - Summer Samba\n3:06 - It's Easy to Say Goodbye\n5:09 - Cried, Cried (Chorou, Chorou)\n7:36 - Rain\n11:24 - The Girl from Ipanema\n14:03 - Beloved Melancholy\n16:45 - Taste of Sadness\n19:40 - Beach Samba\n23:34 - Call Me\n26:01 - Cry Out Your Sadness\n28:48 - The Great Love\n31:52 - Song of the Jet",
        [
            {
                "timeString": "0:00",
                "title": "Summer Samba",
                "time": 0
            },
            {
                "timeString": "3:06",
                "title": "It's Easy to Say Goodbye",
                "time": 186
            },
            {
                "timeString": "5:09",
                "title": "Cried, Cried (Chorou, Chorou)",
                "time": 309
            },
            {
                "timeString": "7:36",
                "title": "Rain",
                "time": 456
            },
            {
                "timeString": "11:24",
                "title": "The Girl from Ipanema",
                "time": 684
            },
            {
                "timeString": "14:03",
                "title": "Beloved Melancholy",
                "time": 843
            },
            {
                "timeString": "16:45",
                "title": "Taste of Sadness",
                "time": 1005
            },
            {
                "timeString": "19:40",
                "title": "Beach Samba",
                "time": 1180
            },
            {
                "timeString": "23:34",
                "title": "Call Me",
                "time": 1414
            },
            {
                "timeString": "26:01",
                "title": "Cry Out Your Sadness",
                "time": 1561
            },
            {
                "timeString": "28:48",
                "title": "The Great Love",
                "time": 1728
            },
            {
                "timeString": "31:52",
                "title": "Song of the Jet",
                "time": 1912
            }
        ]
    ],
    // more cases to handle:
    // a title contains substring resembling track no.: https://www.youtube.com/watch?v=Ecj78esHpDk
    // A/B sides, track length instead of start time: https://www.youtube.com/watch?v=20Q_yMe2nS8
    // track titles that follow a pattern: https://www.youtube.com/watch?v=s--IkNqI9og
    // two track lists in two different languages: https://www.youtube.com/watch?v=FrwksKULOmQ
    // closing parenthesis as part of all track titles: https://www.youtube.com/watch?v=ProvVFrF6b8
    // artists and track title in each row: https://www.youtube.com/watch?v=WDsyzMy4ZXc
    // tracklist in a comment: https://www.youtube.com/watch?v=50jxzRXnzuY
    // tracklist in a comment, with from / to track times: https://www.youtube.com/watch?v=XXKh50tgnGw
];

