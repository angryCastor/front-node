export default {
    "section": {
        "parent": 0,
        "id": 1,
        "name": "sec1",
        "items": [
            {
                "id": 1,
                "name": "item1",
                "date": "05.04.1995"
            }
        ],
        "sections": [
            {
                "parent": 1,
                "id": 2,
                "name": "sec2",
                "items": [
                    {
                        "id": 2,
                        "name": "item2",
                        "date": "05.04.1995"
                    },
                    {
                        "id": 3,
                        "name": "item3",
                        "date": "05.04.1995"
                    }
                ],
                "sections": []
            },
            {
                "parent": 1,
                "id": 3,
                "name": "sec3",
                "items": [
                    {
                        "id": 4,
                        "name": "item4",
                        "date": "05.04.1995"
                    },
                    {
                        "id": 5,
                        "name": "item5",
                        "date": "05.04.1995"
                    }
                ],
                "sections": [
                    {
                        "parent": 3,
                        "id": 4,
                        "name": "sec4",
                        "items": [
                            {
                                "id": 6,
                                "name": "item6",
                                "date": "05.04.1995"
                            },
                            {
                                "id": 7,
                                "name": "item7",
                                "date": "05.04.1995"
                            }
                        ],
                        "sections": []
                    },
                    {
                        "parent": 3,
                        "id": 5,
                        "name": "sec5",
                        "items": [
                            {
                                "name": "item8",
                                "date": "05.04.1995"
                            },
                            {
                                "name": "item9",
                                "date": "05.04.1995"
                            }
                        ],
                        "sections": []
                    }
                ]
            }
        ]
    }
}