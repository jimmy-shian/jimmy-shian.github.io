# -*- coding: utf-8 -*-
import os
import sys

# Ensure stdout uses utf-8
if sys.stdout.encoding != 'utf-8':
    try:
        import io
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    except Exception:
        pass

# Template
# Stained glass tarot card design of [CARD_SUBJECT], [DETAILED_SCENE]. Stained glass art style, vibrant colored glass panes, medieval gothic cathedral window aesthetic. Intricate thick black lead cames outlining every shape. Backlit by a warm, mystical, celestial light diffusing through the textured glass, creating a soft ethereal glow. Rich color palette of [SPECIFIC_COLORS]. Symmetrical frame, flat 2D perspective, highly symbolic, tarot card design.

cards = [
    # === Major Arcana ===
    {
        "name": "0 愚者 (The Fool)",
        "subject": "The Fool (0)",
        "scene": "A young carefree traveler standing on the edge of a jagged cliff, looking upwards with arms wide open. A small white dog leaps playfully at his feet. A bright golden sun shines in the upper corner",
        "colors": "golden yellows, sky blues, and emerald greens"
    },
    {
        "name": "I 魔術師 (The Magician)",
        "subject": "The Magician (I)",
        "scene": "A powerful mage standing with one hand pointing to the sky and the other pointing down to the earth. An infinity symbol glows above his head. On a table in front of him are the four tarot tools: a cup, a sword, a wand, and a pentacle",
        "colors": "deep ruby reds, pure whites, and brilliant golds"
    },
    {
        "name": "II 女祭司 (The High Priestess)",
        "subject": "The High Priestess (II)",
        "scene": "A mysterious seated woman between a black pillar inscribed with 'B' and a white pillar inscribed with 'J'. She holds a scroll marked 'TORA' in her lap, and a crescent moon sits at her feet",
        "colors": "deep sapphire blues, silver whites, and midnight purples"
    },
    {
        "name": "III 皇后 (The Empress)",
        "subject": "The Empress (III)",
        "scene": "A beautiful crowned queen sitting on a throne of plush pillows in a rich, ripe wheat field, surrounded by a lush forest and a flowing river. A scepter rests in her hand",
        "colors": "forest greens, harvest golds, and soft rose pinks"
    },
    {
        "name": "IV 皇帝 (The Emperor)",
        "subject": "The Emperor (IV)",
        "scene": "A stern, bearded ruler seated on a stone throne decorated with ram heads. He holds an orb and an ankh scepter, standing against a backdrop of barren, fiery mountains",
        "colors": "dark crimson reds, stone grays, and ancient bronze"
    },
    {
        "name": "V 教皇 (The Hierophant)",
        "subject": "The Hierophant (V)",
        "scene": "A religious leader seated on a throne between two stone pillars, raising two fingers in blessing to two acolytes kneeling before him. He holds a triple-cross scepter",
        "colors": "royal purples, warm ochre, and shimmering gold"
    },
    {
        "name": "VI 戀人 (The Lovers)",
        "subject": "The Lovers (VI)",
        "scene": "A man and a woman standing beneath a glowing angel with outspread wings, with the Tree of Knowledge and a serpent behind the woman, and the Tree of Life behind the man",
        "colors": "soft peach, vibrant emerald, sky blue, and deep violet"
    },
    {
        "name": "VII 戰車 (The Chariot)",
        "subject": "The Chariot (VII)",
        "scene": "A proud warrior in armor standing in a chariot pulled by two sphinxes, one black and one white, moving forward under a canopy of stars",
        "colors": "metallic blues, silver grays, and stark black and white"
    },
    {
        "name": "VIII 力量 (Strength)",
        "subject": "Strength (VIII)",
        "scene": "A gentle woman crowned with flowers, calmly closing the jaws of a fierce wild lion with her hands. An infinity symbol floats above her head",
        "colors": "soft whites, wild oranges, and deep foliage greens"
    },
    {
        "name": "IX 隱者 (The Hermit)",
        "subject": "The Hermit (IX)",
        "scene": "A cloaked old man standing alone on a snow-capped mountain peak, holding a staff in one hand and raising a glowing lantern containing a six-pointed star in the other",
        "colors": "ice blues, pale grays, and glowing lantern gold"
    },
    {
        "name": "X 命運之輪 (Wheel of Fortune)",
        "subject": "Wheel of Fortune (X)",
        "scene": "A giant spinning wooden wheel inscribed with letters, surrounded by a sphinx on top, a serpent ascending, and anubis descending, with winged figures in the corners",
        "colors": "turquoise, ruby red, and deep bronze"
    },
    {
        "name": "XI 正義 (Justice)",
        "subject": "Justice (XI)",
        "scene": "A solemn figure seated between two pillars, holding a scale in the left hand and a double-edged sword upright in the right hand",
        "colors": "emerald green, deep crimson, and bright gold"
    },
    {
        "name": "XII 吊人 (The Hanged Man)",
        "subject": "The Hanged Man (XII)",
        "scene": "A man hanging upside down from a wooden T-cross by one foot, his other leg crossed behind, with a bright yellow halo glowing around his head",
        "colors": "wood browns, bright yellows, and cobalt blues"
    },
    {
        "name": "XIII 死神 (Death)",
        "subject": "Death (XIII)",
        "scene": "A skeleton in black armor riding a pale horse, holding a black banner decorated with a white rose. A dead king, a kneeling child, and a priest stand nearby",
        "colors": "obsidian black, pale bone white, and dark royal purple"
    },
    {
        "name": "XIV 節制 (Temperance)",
        "subject": "Temperance (XIV)",
        "scene": "An angel with wings, standing with one foot on land and one foot in a stream, pouring liquid between two cups, with a path leading to a glowing sun over mountains",
        "colors": "sunset oranges, sky blues, and angelic whites"
    },
    {
        "name": "XV 惡魔 (The Devil)",
        "subject": "The Devil (XV)",
        "scene": "A winged horned deity sat on a stone pedestal, to which a naked man and woman are chained by their necks, representing temptation and bond",
        "colors": "dark charcoal, sulfur yellow, and hellish reds"
    },
    {
        "name": "XVI 高塔 (The Tower)",
        "subject": "The Tower (XVI)",
        "scene": "A tall stone tower struck by a bolt of lightning from the dark clouds, with two figures falling headfirst and a gold crown falling from the top",
        "colors": "electric blues, fiery oranges, and stone grays"
    },
    {
        "name": "XVII 星星 (The Star)",
        "subject": "The Star (XVII)",
        "scene": "A naked woman kneeling by a pool, pouring water onto the land and into the water from two jugs, under a giant shining yellow star and seven smaller white stars",
        "colors": "sapphire blue, glowing gold, and soft skin tones"
    },
    {
        "name": "XVIII 月亮 (The Moon)",
        "subject": "The Moon (XVIII)",
        "scene": "A full moon shining between two towers, with a dog and a wolf howling below, and a crayfish emerging from a pool in the foreground",
        "colors": "midnight blue, pale yellow, and jade green"
    },
    {
        "name": "XIX 太陽 (The Sun)",
        "subject": "The Sun (XIX)",
        "scene": "A joyful child riding a white horse under a smiling, brilliant sun with long rays, with a brick wall and bright sunflowers behind them",
        "colors": "bright yellow, vibrant orange, and pure white"
    },
    {
        "name": "XX 審判 (Judgement)",
        "subject": "Judgement (XX)",
        "scene": "An angel blowing a golden trumpet from a cloud, as figures rise from open graves below with arms outstretched",
        "colors": "pale blue, bright gold, and light gray"
    },
    {
        "name": "XXI 世界 (The World)",
        "subject": "The World (XXI)",
        "scene": "A dancing figure draped in a purple sash, holding two wands, framed by a giant green laurel wreath, with the four tetramorph symbols in the corners",
        "colors": "vibrant purple, laurel green, and brilliant gold"
    },

    # === Wands ===
    {
        "name": "Ace of Wands (權杖一)",
        "subject": "Ace of Wands",
        "scene": "A single wooden staff sprouting green leaves, gripped by a hand emerging from a glowing white cloud, against a mountainous landscape",
        "colors": "bright green, sky blue, and warm wood browns"
    },
    {
        "name": "Two of Wands (權杖二)",
        "subject": "Two of Wands",
        "scene": "A man holding a globe stands between two wands on a castle battlement, gazing out over the ocean",
        "colors": "ocean blues, terracotta orange, and sand yellows"
    },
    {
        "name": "Three of Wands (權杖三)",
        "subject": "Three of Wands",
        "scene": "A merchant in robes standing on a cliff, looking at ships in the sea, with three wands planted in the ground around him",
        "colors": "golden sunset orange, deep sea blue, and crimson red"
    },
    {
        "name": "Four of Wands (權杖四)",
        "subject": "Four of Wands",
        "scene": "Four wands forming an arch draped with heavy flower garlands, with a celebrating crowd in the background",
        "colors": "harvest yellows, rose pinks, and forest greens"
    },
    {
        "name": "Five of Wands (權杖五)",
        "subject": "Five of Wands",
        "scene": "Five youths fighting or playing with wooden wands in conflict, representing competition and struggle",
        "colors": "muddy browns, vibrant shirt reds and blues, and dusty ochre"
    },
    {
        "name": "Six of Wands (權杖六)",
        "subject": "Six of Wands",
        "scene": "A knight wearing a laurel crown, riding a horse in a victory parade, surrounded by people holding five wands",
        "colors": "triumphant gold, emerald green, and equestrian white"
    },
    {
        "name": "Seven of Wands (權杖七)",
        "subject": "Seven of Wands",
        "scene": "A brave warrior on a hill holding a wand defensively against six wands pointing at him from below",
        "colors": "rugged stone gray, safety green, and warning orange"
    },
    {
        "name": "Eight of Wands (權杖八)",
        "subject": "Eight of Wands",
        "scene": "Eight wands flying through the air in parallel formation, heading towards the earth",
        "colors": "windy sky blue, cloud white, and wood brown"
    },
    {
        "name": "Nine of Wands (權杖九)",
        "subject": "Nine of Wands",
        "scene": "A weary, bandaged man standing in front of a fence of eight wands, holding a single wand defensively",
        "colors": "dark amber, bandage white, and barrier brown"
    },
    {
        "name": "Ten of Wands (權杖十)",
        "subject": "Ten of Wands",
        "scene": "A burdened man carrying ten heavy wands towards a town, bowed down by the weight",
        "colors": "dusty yellow, shadow charcoal, and heavy wood colors"
    },
    {
        "name": "Page of Wands (權杖侍從)",
        "subject": "Page of Wands",
        "scene": "A young page standing in the desert, holding a tall wand and looking at it with curiosity, wearing a feathered hat",
        "colors": "desert sand, feather red, and linen yellow"
    },
    {
        "name": "Knight of Wands (權杖騎士)",
        "subject": "Knight of Wands",
        "scene": "A charging knight on a horse, holding a wand, wearing armor with fire patterns on his cloak",
        "colors": "blazing orange, metallic steel, and flame red"
    },
    {
        "name": "Queen of Wands (權杖皇后)",
        "subject": "Queen of Wands",
        "scene": "A queen seated on a throne decorated with lions, holding a wand and a sunflower, with a black cat sitting at her feet",
        "colors": "sunflower yellow, lion bronze, and cat black"
    },
    {
        "name": "King of Wands (權杖國王)",
        "subject": "King of Wands",
        "scene": "A king seated on a throne decorated with lions and salamanders, holding a wand, wearing a fire-orange robe",
        "colors": "fire orange, crown gold, and salamander red"
    },

    # === Cups ===
    {
        "name": "Ace of Cups (聖杯一)",
        "subject": "Ace of Cups",
        "scene": "A single glowing golden cup overflowing with five streams of water into a lotus pond, with a dove carrying a host hovering above",
        "colors": "glowing gold, teal water, and soft pink lotuses"
    },
    {
        "name": "Two of Cups (聖杯二)",
        "subject": "Two of Cups",
        "scene": "A man and a woman exchanging cups in a vow under a caduceus of Hermes and a winged lion head, symbolizing love and union",
        "colors": "blush pink, sky blue, and caduceus gold"
    },
    {
        "name": "Three of Cups (聖杯三)",
        "subject": "Three of Cups",
        "scene": "Three maidens holding cups high in the air, dancing in a circle in a harvest field",
        "colors": "grape purple, emerald green, and harvest yellow"
    },
    {
        "name": "Four of Cups (聖杯四)",
        "subject": "Four of Cups",
        "scene": "A young man sitting under a tree, arms crossed, looking at three cups on the grass, ignoring a fourth cup offered by a cloud hand",
        "colors": "shade green, grass yellow, and contemplative gray"
    },
    {
        "name": "Five of Cups (聖杯五)",
        "subject": "Five of Cups",
        "scene": "A cloaked figure mourning over three spilt cups, with two full cups remaining behind him, near a river with a bridge",
        "colors": "mourning black, spilt wine red, and river blue"
    },
    {
        "name": "Six of Cups (聖杯六)",
        "subject": "Six of Cups",
        "scene": "Two children in a cozy garden, one offering a cup filled with flowers to the other, representing innocence and memory",
        "colors": "blossom pink, garden green, and warm clay"
    },
    {
        "name": "Seven of Cups (聖杯七)",
        "subject": "Seven of Cups",
        "scene": "A silhouetted figure standing before seven cups floating in clouds, each containing strange and mystical treasures",
        "colors": "mystic purple, cloud gray, and iridescent neon"
    },
    {
        "name": "Eight of Cups (聖杯八)",
        "subject": "Eight of Cups",
        "scene": "A figure walking away into the mountains under a crescent moon, leaving behind a stack of eight standing cups",
        "colors": "midnight indigo, moon silver, and mountain charcoal"
    },
    {
        "name": "Nine of Cups (聖杯九)",
        "subject": "Nine of Cups",
        "scene": "A satisfied, smiling man sitting with arms crossed in front of a table holding nine cups arranged in a row",
        "colors": "royal blue, feast gold, and rich mahogany"
    },
    {
        "name": "Ten of Cups (聖杯十)",
        "subject": "Ten of Cups",
        "scene": "A happy family standing under a rainbow of ten cups, looking at their cozy cottage",
        "colors": "rainbow iridescent, cottage green, and sky blue"
    },
    {
        "name": "Page of Cups (聖杯侍從)",
        "subject": "Page of Cups",
        "scene": "A page holding a cup containing a curious blue fish, wearing blue robes with wave patterns",
        "colors": "ocean blue, coral pink, and fish silver"
    },
    {
        "name": "Knight of Cups (聖杯騎士)",
        "subject": "Knight of Cups",
        "scene": "A graceful knight riding a white horse slowly, holding out a cup in invitation",
        "colors": "aquamarine, horse white, and chalice gold"
    },
    {
        "name": "Queen of Cups (聖杯皇后)",
        "subject": "Queen of Cups",
        "scene": "A queen looking at a highly ornate, closed cup by the seashore, representing deep intuition",
        "colors": "sea glass blue, shell pink, and wave green"
    },
    {
        "name": "King of Cups (聖杯國王)",
        "subject": "King of Cups",
        "scene": "A king sitting on a throne floating in the sea, holding a cup and a scepter, with a ship sailing behind him",
        "colors": "deep marine blue, crown gold, and sail white"
    },

    # === Swords ===
    {
        "name": "Ace of Swords (寶劍一)",
        "subject": "Ace of Swords",
        "scene": "A single upright sword crowned with a wreath, held by a hand emerging from a cloud over a rugged terrain",
        "colors": "steel silver, crown green, and storm blue"
    },
    {
        "name": "Two of Swords (寶劍二)",
        "subject": "Two of Swords",
        "scene": "A blindfolded woman sitting by the sea, holding two crossed swords in balance under a crescent moon",
        "colors": "slate gray, sea teal, and blindfold white"
    },
    {
        "name": "Three of Swords (寶劍三)",
        "subject": "Three of Swords",
        "scene": "A bright red heart pierced by three swords in a storm of rain and dark clouds",
        "colors": "blood red, steel gray, and dark charcoal"
    },
    {
        "name": "Four of Swords (寶劍四)",
        "subject": "Four of Swords",
        "scene": "A stone effigy of a knight resting on a tomb, with three swords hanging on the wall and one sword beneath him",
        "colors": "tomb gray, cathedral gold, and iron brown"
    },
    {
        "name": "Five of Swords (寶劍五)",
        "subject": "Five of Swords",
        "scene": "A smug warrior holding three swords, looking at two defeated opponents walking away in shame on a windy beach",
        "colors": "stormy sea green, steel silver, and wind gray"
    },
    {
        "name": "Six of Swords (寶劍六)",
        "subject": "Six of Swords",
        "scene": "A ferryman rowing a boat carrying a mother and child, with six swords standing upright in the boat",
        "colors": "misty gray, river blue, and cloak brown"
    },
    {
        "name": "Seven of Swords (寶劍七)",
        "subject": "Seven of Swords",
        "scene": "A thief sneaking away with five swords in his arms, leaving two swords behind in a military camp",
        "colors": "camp orange, stealth purple, and iron silver"
    },
    {
        "name": "Eight of Swords (寶劍八)",
        "subject": "Eight of Swords",
        "scene": "A bound and blindfolded woman standing in a muddy pool, surrounded by a fence of eight swords",
        "colors": "mud brown, blindfold red, and cold gray"
    },
    {
        "name": "Nine of Swords (寶劍九)",
        "subject": "Nine of Swords",
        "scene": "A sorrowful person sitting up in bed, face buried in hands, with nine swords hanging horizontally on the wall behind",
        "colors": "bedding white, shadow black, and steel gray"
    },
    {
        "name": "Ten of Swords (寶劍十)",
        "subject": "Ten of Swords",
        "scene": "A defeated man lying flat on his face, with ten swords stabbed into his back under a dark night sky",
        "colors": "abyssal black, blood red, and twilight purple"
    },
    {
        "name": "Page of Swords (寶劍侍從)",
        "subject": "Page of Swords",
        "scene": "A page holding a sword with both hands, standing on a windy hill under turbulent clouds",
        "colors": "windy green, cloud gray, and steel silver"
    },
    {
        "name": "Knight of Swords (寶劍騎士)",
        "subject": "Knight of Swords",
        "scene": "A fierce knight charging at full speed on a white horse, sword drawn, rushing into battle under windy clouds",
        "colors": "lightning yellow, horse white, and armor silver"
    },
    {
        "name": "Queen of Swords (寶劍皇后)",
        "subject": "Queen of Swords",
        "scene": "A queen seated on a throne, raising one hand and holding a sword upright, with clouds in the background",
        "colors": "cloud white, throne gray, and scepter silver"
    },
    {
        "name": "King of Swords (寶劍國王)",
        "subject": "King of Swords",
        "scene": "A wise king seated on a throne, holding a sword straight up, looking forward with a serious expression",
        "colors": "royal blue, stone gray, and blade steel"
    },

    # === Pentacles ===
    {
        "name": "Ace of Pentacles (錢幣一)",
        "subject": "Ace of Pentacles",
        "scene": "A single large gold coin with a pentagram, held by a hand emerging from a cloud over a lush garden with a pathway",
        "colors": "glowing gold, garden green, and lily white"
    },
    {
        "name": "Two of Pentacles (錢幣二)",
        "subject": "Two of Pentacles",
        "scene": "A young man dancing, looping two pentacles in an infinity symbol, with ships sailing on rough seas in the background",
        "colors": "rough sea teal, dress red, and pentacle gold"
    },
    {
        "name": "Three of Pentacles (錢幣三)",
        "subject": "Three of Pentacles",
        "scene": "An apprentice stonemason working on a cathedral wall, consulting with a priest and a monk holding plans",
        "colors": "masonry gray, church gold, and robe brown"
    },
    {
        "name": "Four of Pentacles (錢幣四)",
        "subject": "Four of Pentacles",
        "scene": "A wealthy merchant sitting down, clutching one pentacle, with two under his feet and one balanced on his crown",
        "colors": "merchant red, chest brown, and coin gold"
    },
    {
        "name": "Five of Pentacles (錢幣五)",
        "subject": "Five of Pentacles",
        "scene": "Two poor, injured beggars walking in snow past a glowing, stained-glass window of a church showing five pentacles",
        "colors": "church window gold, snow white, and beggar gray"
    },
    {
        "name": "Six of Pentacles (錢幣六)",
        "subject": "Six of Pentacles",
        "scene": "A wealthy man weighing coins on a scale, distributing charity to two poor men kneeling at his feet",
        "colors": "rich purple, beggar brown, and scale bronze"
    },
    {
        "name": "Seven of Pentacles (錢幣七)",
        "subject": "Seven of Pentacles",
        "scene": "A farmer leaning on his shovel, looking at his crop of seven pentacles growing on a lush vine",
        "colors": "foliage green, soil brown, and crop gold"
    },
    {
        "name": "Eight of Pentacles (錢幣八)",
        "subject": "Eight of Pentacles",
        "scene": "A craftsman carving a pentagram onto a gold coin, with seven other completed pentacles hanging on the wall of his workshop",
        "colors": "workshop orange, tool gray, and coin gold"
    },
    {
        "name": "Nine of Pentacles (錢幣九)",
        "subject": "Nine of Pentacles",
        "scene": "An elegant woman standing in a vineyard filled with gold pentacles, with a hooded falcon resting on her gloved hand",
        "colors": "vineyard green, gown gold, and falcon brown"
    },
    {
        "name": "Ten of Pentacles (錢幣十)",
        "subject": "Ten of Pentacles",
        "scene": "An old patriarch sitting with dogs outside an archway of a family manor, with ten pentacles arranged in the Tree of Life layout",
        "colors": "archway gray, dog white, and family gold"
    },
    {
        "name": "Page of Pentacles (錢幣侍從)",
        "subject": "Page of Pentacles",
        "scene": "A young page standing in a field, holding a gold pentacle gently and gazing at it with focus and concentration",
        "colors": "meadow green, crop gold, and robe green"
    },
    {
        "name": "Knight of Pentacles (錢幣騎士)",
        "subject": "Knight of Pentacles",
        "scene": "A steady knight in armor on a heavy plow horse, holding a gold pentacle, looking out over plowed fields",
        "colors": "earth brown, armor steel, and field yellow"
    },
    {
        "name": "Queen of Pentacles (錢幣皇后)",
        "subject": "Queen of Pentacles",
        "scene": "A queen seated on a throne decorated with cherubs, holding a gold pentacle, surrounded by a lush green garden",
        "colors": "garden green, throne gold, and robe red"
    },
    {
        "name": "King of Pentacles (錢幣國王)",
        "subject": "King of Pentacles",
        "scene": "A rich king seated on a throne decorated with bulls, holding a gold pentacle and a scepter, surrounded by vines and flowers",
        "colors": "bull bronze, vine green, and kingly gold"
    }
]

output_file = os.path.join("images", "prompts.txt")

try:
    with open(output_file, "w", encoding="utf-8") as f:
        f.write("# ==============================================================================\n")
        f.write("# 塔羅牌「玻璃彩繪風格 (Stained Glass Style)」AI 繪圖提示詞 (Prompts) - 完整 78 張牌\n")
        f.write("# ==============================================================================\n")
        f.write("# 風格模板 (Style Template):\n")
        f.write("# Stained glass tarot card design of [CARD_SUBJECT], [DETAILED_SCENE]. Stained glass art style, vibrant colored glass panes, medieval gothic cathedral window aesthetic. Intricate thick black lead cames outlining every shape. Backlit by a warm, mystical, celestial light diffusing through the textured glass, creating a soft ethereal glow. Rich color palette of [SPECIFIC_COLORS]. Symmetrical frame, flat 2D perspective, highly symbolic, tarot card design.\n")
        f.write("# ==============================================================================\n\n")

        for card in cards:
            f.write(f"# {card['name']}\n")
            prompt = (
                f"Stained glass tarot card design of {card['subject']}. "
                f"{card['scene']}. Stained glass art style, vibrant colored glass panes, "
                f"medieval gothic cathedral window aesthetic. Intricate thick black lead cames outlining every shape. "
                f"Backlit by a warm, mystical, celestial light diffusing through the textured glass, "
                f"creating a soft ethereal glow. Rich color palette of {card['colors']}. "
                f"Symmetrical frame, flat 2D perspective, highly symbolic, tarot card design.\n\n"
            )
            f.write(prompt)

    print(f"成功生成 78 張塔羅牌的提示詞，已寫入 {output_file}！")
    sys.exit(0)
except Exception as e:
    print(f"寫入失敗: {e}")
    sys.exit(1)
