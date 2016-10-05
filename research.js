function(context, args) { // t:#s.nuutec.pub

	var logo = "" // "\n      ◢███◤\n     ◢██◤                                     ◥██◣\n    ◢██◤                                        ██◣\n   ◢██◤                                         ███\n  ◢██◤ `3◢█████◤ ◢█████◣ ◢██████ ◢█████◤ ██    `   ███\n◢███◤  `3█◤      ██    █ ██   ██ ██      ██ ◢█◤`   ███\n◥███   `3◥█████◣ ██◢███◤ ██   ██ ██      ██◢█◤ `   ███◣\n ███   `3     ◢█ ██      ██   ██ ██      ██◥█◣ `  ◢███◤\n ███   `3◢█████◤ ██      ██████◤ ██████◤ ██ ◥█◣` ◢██◤\n ███                                         ◢██◤\n ◥██                                        ◢██◤\n  ◥██◣                                     ◢██◤\n                                         ◢███◤\n\n"

	function filter(s, a) {
		var l = []
		for (var i = 0; i<a.length; i++)
		{
			if (a[i].lastIndexOf("cyberdine.", 0) === 0 ||
				a[i].lastIndexOf("nuutec.", 0) === 0 ||
				a[i].lastIndexOf("weyland.", 0) === 0 )
			{
				l.push(a[i])
			}
		}
		return "\n\nFiltered scripts." + s + "sec:\n" + JSON.stringify(l, null, 4)
	}

	if (!args || !args.t) {
		var fs = filter("full", #s.scripts.fullsec())
		var hs = filter("high", #s.scripts.highsec())
		//var ms = filter("mid", #s.scripts.highsec())

		return {
			ok: false, msg: logo + "Usage: spock.research { t:#s.cyberdine.external }\n" +
			"       spock.research { t:#s.nuutec.out, p:2 }\n" +
			"       spock.research { t:#s.weyland.info, p:2, option:\"t1s\" }" + fs + hs // + ms
		}
	}

	if (#s.scripts.get_level({name: args.t.name}) < 4)
	{
		return {ok: false, msg: logo + "The target you have specified is not FULLSEC"}
	}

	var validOptions = ["t1s", "t2s"]
	if (args.option && !validOptions.indexOf(args.option))
	{
		return {ok: false, msg: logo + "The valid +values+ for !option! are +t1s+ and +t2s+"}
	}

	var h = args.t.call({})
	var k = h.match(/\s(\w+):/)[1]
	var v = h.match(/\"(\w+)\"/g)
	v = v[v.length - 1]
	v = v.replace(/\"/g, '')

	h = args.t.call()
	var vals = h.match(/(\w+) \|/g)
	vals[0] = vals[0].replace(' |', '')
	vals[1] = vals[1].replace(' |', '')

	//#s.chats.tell({to:"spock", msg:JSON.stringify([k, v, vals])})

	function getPassword(passwordScreen) {
		var known_passwds = ['knowyourteam']
		var pw;
		var regexs =
			[
				/strategy (\w+) and we will/g
			]

		for (var i = 0; i < regexs.length; i++) {
			var res;
			while ((res = regexs[i].exec(passwordScreen)) !== null) {
				pw = res[1];
			}
		}

		if (pw == null) return passwordScreen

		return pw
	}

	function getProjectIds(blogScreen) {
		var pids = []
		var regexs =
			[
				/Work continues on (\w+)\,/g,
				/new developments on (\w+) progress/g,
				/of project (\w+) has come clean/g,
				/Look for (\w+) in your mailbox/g,
				/release date for (\w+)\./g,
			]

		for (var i = 0; i < regexs.length; i++) {
			var res;
			while ((res = regexs[i].exec(blogScreen)) !== null) {
				pids.push(res[1]);
			}
		}

		return pids
	}

	var p = 0
	function getAbandonedAccounts(projectIds) {
		var accts = []
		var start = 0
		if (args.p)
		{
			if (args.p >= 0 && args.p * 25 <= projectIds.length)
			{
				p = args.p
				start = args.p * 25
			}
			else
			{
				return "bad p"
			}
		}

		for (var i = start; i < start + 25; i++)
		{
			d["project"] = projectIds[i]
			accts = accts.concat(args.t.call(d))
		}

		for (var i = accts.length; i>=0; i--)
		{
			if( accts[i] === undefined ||
				accts[i] === null ||
				accts[i].includes("null") ||
				accts[i].includes("missing") ||
				accts[i].includes("empty") ||
				accts[i].includes("nil") ||
				accts[i].includes("error") ||
				accts[i].includes("NULL") ||
				accts[i].includes("criminal activity") ||
				accts[i].includes("Authenticated")
				)
			{
				accts.splice(i, 1);
			}
		}
		return accts
	}

	function getUsernames(blogScreen) {
		var users = []
		var regexs =
			[
				/\n(\w+) of project/g
			]

		for (var i = 0; i < regexs.length; i++) {
			var res;
			while ((res = regexs[i].exec(blogScreen)) !== null) {
				users.push(res[1]);
			}
		}

		return users
	}

	var d = {}
	if (!args.option || args.option === "t1s")
	{
		d[k] = vals[1]
		var passwordValue = getPassword(args.t.call(d))

		// #s.chats.tell({to:"spock", msg:JSON.stringify({passwd: passwordValue})})

		d[k] = vals[0]
		var blogScreen = args.t.call(d)
		var projectIds = getProjectIds(blogScreen)

		// #s.chats.tell({to:"spock", msg:JSON.stringify([passwordValue, projectIds])})

		d[k] = v
		d["p"] = passwordValue
		d["pass"] = passwordValue
		d["password"] = passwordValue
		var accounts = getAbandonedAccounts(projectIds)

		var numpages = Math.floor(projectIds.length / 25);

		if (accounts == "bad p")
		{
			return { ok: false, msg: logo + "Index 'p' is out of range. 'p' should be between 0 and " + numpages }
		}

		return {ok:true, msg:JSON.stringify({t1s: accounts, p: p, numpages: numpages, option:"t1s"}, null, 4)}
	}
	else if (args.option === "t2s")
	{
		d[k] = vals[0]
		var blogScreen = args.t.call(d)
		var users = getUsernames(blogScreen)

		if (!args.u)
		{
			var hs = filter("high", #s.scripts.highsec())
			var s = "\n\n`1Error:` Missing scriptor\nUsage: spock.research { t:#s.weyland.info, u:#s.weyland.members_only, option:\"t2s\" }" + hs;
			return {ok: true, msg: JSON.stringify({t2users: users, option: "t2s"}, null, 4) + s}
		}

		var o = args.u.call({username:users[0]})
		var v = o.match(/\!(\w+)\!/g)

		// #s.chats.tell({to:"spock", msg:k})
		var d = {}
		d[v] = "order_qrs"
		var qrs = []
		for (var i=0; i<users.length; i++)
		{
			d["username"] = users[i]
			args.u.call(d)
		}
		qrs = args.u.call(d)

		return {ok: true, msg: JSON.stringify({t2users: users, t2qrs: qrs, option: "t2s"}, null, 4)}
	}
}
