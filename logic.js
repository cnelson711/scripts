function(context, args)
{ // t:#s.abandoned_user.p_loc123
    var logo = "\n      ◢███◤\n     ◢██◤                                     ◥██◣\n    ◢██◤                                        ██◣\n   ◢██◤                                         ███\n  ◢██◤ `3◢█████◤ ◢█████◣ ◢██████ ◢█████◤ ██    `   ███\n◢███◤  `3█◤      ██    █ ██   ██ ██      ██ ◢█◤`   ███\n◥███   `3◥█████◣ ██◢███◤ ██   ██ ██      ██◢█◤ `   ███◣\n ███   `3     ◢█ ██      ██   ██ ██      ██◥█◣ `  ◢███◤\n ███   `3◢█████◤ ██      ██████◤ ██████◤ ██ ◥█◣` ◢██◤\n ███                                         ◢██◤\n ◥██                                        ◢██◤\n  ◥██◣                                     ◢██◤\n                                         ◢███◤\n"

    if(!args || !args.t)
    {
        return { ok:false, msg: logo + "Usage: spock.logic { t:#s.user.loc }" }
    }

    if(#s.scripts.get_level({name:args.t.name})<4)
    {
        return {ok:false, msg: logo + "The target you have specified is not FULLSEC"}
    }

    function c() // call
    {
    	// #s.chats.tell({to:context.caller,msg:o})
        o = args.t.call(d)
    }

    function f(q) // find
    {
        return o.includes(q)
    }

    var x = ["red", "orange", "yellow", "lime", "green", "cyan", "blue", "purple"]
    var p = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97]
    var e = ["open","unlock","release"]

    var i = 0
    var d = {}
    var o = {}
    c();

    while(f("+LOCK_ERROR+")) {
        i = 0;
        if (f("!EZ_21!")) {
            while (f("!EZ_21!") || f("is not")) {
                d.EZ_21 = e[i++]
                c()
            }
        }

        i = 0
        if (f("!EZ_35!")) {
            while (!f("digit")) {
                d.EZ_35 = e[i++]
                c()
            }
            i = 0;
            while (f("digit")) {
                d.digit = i++
                c()
            }
        }


        i = 0
        if (f("!EZ_40!")) {
            while (!f("ez_prime")) {
                d.EZ_40 = e[i++]
                c()
            }
            i = 0
            while (f("prime")) {
                d.ez_prime = p[i++]
                c()
            }
        }

        i = -1
        if (f("!c001!")) {
            while (f("!c001!") || f("is not")) {
                d.c001 = x[++i]
                d.color_digit = x[i].length
                c()
            }
        }

        i = -1
        if (f("!c002!")) {
            while (f("!c002!") || f("is not")) {
                d.c002 = x[++i]
                d.c002_complement = x[(i + 4) % 8]
                c()
            }
        }

        i = -1
        if (f("!c003!")) {
            while (f("!c003!") || f("is not")) {
                d.c003 = x[++i]
                d.c003_triad_1 = x[(i + 5) % 8]
                d.c003_triad_2 = x[(i + 3) % 8]
                c()
            }
        }

    }

    //#s.chats.join({channel:"0000"})
    //#s.chats.send({channel:"0000", msg:"I used spock.logic { t:#s." + args.t.name + "} to hack a t1."})

    // return { ok:true, msg: logo + o};
    return { ok:true };
}