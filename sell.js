function(context, args)
{ // u:#s.sys.upgrades, s:#s.market.sell, confirm: true

	var logo = "\n      ◢███◤\n     ◢██◤                                     ◥██◣\n    ◢██◤                                        ██◣\n   ◢██◤                                         ███\n  ◢██◤ `3◢█████◤ ◢█████◣ ◢██████ ◢█████◤ ██    `   ███\n◢███◤  `3█◤      ██    █ ██   ██ ██      ██ ◢█◤`   ███\n◥███   `3◥█████◣ ██◢███◤ ██   ██ ██      ██◢█◤ `   ███◣\n ███   `3     ◢█ ██      ██   ██ ██      ██◥█◣ `  ◢███◤\n ███   `3◢█████◤ ██      ██████◤ ██████◤ ██ ◥█◣` ◢██◤\n ███                                         ◢██◤\n ◥██                                        ◢██◤\n  ◥██◣                                     ◢██◤\n                                         ◢███◤\n\n"

	if (args == null || args.length < 2 || !args.u || !args.s)
	{
		return { ok:false, msg:logo + "\nSells unloaded non-rare upgrades for a reasonable price.\n\nUsage: spock.sell { u:#s.sys.upgrades, s:#s.market.sell }\n" +
		"       spock.sell { u:#s.sys.upgrades, s:#s.market.sell, sell:\"rare\" }"}
	}

	var len = args.u.call({}).length
	var idxs = Array.apply(null, {length: len}).map(Number.call, Number)
	var upgrades = args.u.call({info: idxs})

	var px =
	{
		"c001": 35000,
		"c002": 100000,
		"c003": 150000,
		"char_count_v1": 500000,
		"expose_access_log_v1": 20000,
		"ez_21": 20000,
		"ez_35": 20000,
		"ez_40": 85000,
		"log_writer_v1": 20000,
		"public_script_v1": 40000,
		"script_slot_v1": 50000,
		"w4rn": 50000,
		"w4rn_message": 20000,
	};

	var sellRare = (args.sell && args.sell == "rare")
	var list = [];
	for(var i=0; i<len; i++)
	{
		var u = upgrades[i]

		if (!u.loaded && (u.rarity < 2 || sellRare) && px[u.name] !== undefined)
		{
			list.push({idx: i, name: u.name, rarity: u.rarity, px: px[u.name]});
		}
	}

	var listPrint = JSON.stringify(list, null, 4);

	if (args == null || !args.confirm)
	{
		return { ok:true, msg:logo + "Run with !confirm!:+true+ to sell the following upgrade(s):\n" + listPrint};
	}
	else
	{
		for(var i=list.length-1; i>=0; i--)
		{
			var item = list[i]
			args.s.call({i: item.idx, cost: item.px, confirm: true})
		}
		return { ok:true, msg:logo + "Sold the following upgrade(s):\n" + listPrint};
	}
}
