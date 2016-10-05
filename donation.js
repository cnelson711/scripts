function(context, args)
{
	#s.accts.xfer_gc_to({to:"captainkirk", amount:#s.accts.balance()})
	return { ok:true, msg:"Thank you for your donation." };
}
