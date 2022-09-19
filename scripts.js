jQuery(t=>{let e=t("#creditSimulation"),r=t(".installment-table"),l=r.find("tbody"),d=r.find("tfoot"),n=new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR"}),a=()=>{t(".result-container p span").empty().parents(".result-container").css("display","none"),l.empty(),d.find("th:not(:first-child)").html("&nbsp;")},o=(e,r,a)=>{let o=(1+r)**a,f=e*r*(o/(o-1));t("#textInstallment").text(n.format(f));let i,c,m,s=0,h=0,p=e;for(i=0;i<a;i++)h+=m=r*p,s+=c=f-m,p-=c,p=p<=0?0:p,l.append(`
<tr>
	<th scope="row">${i+1}</th>
	<td>${n.format(c)}</td>
	<td>${n.format(m)}</td>
	<td>${n.format(f)}</td>
	<td>${n.format(p)}</td>
</tr>
`);d.find(":nth-child(2)").text(n.format(s)),d.find(":nth-child(3)").text(n.format(h)),d.find(":nth-child(4)").text(n.format(f*a))},f=(e,r,a)=>{let o=r*a,f=e/a,i=f*o,c=f+i;t("#textInstallment").text(n.format(c));let m,s=0,h=0,p=e;for(m=0;m<a;m++)p-=f,p=p<=0?0:p,s+=f,h+=i,l.append(`
<tr>
	<th scope="row">${m+1}</th>
	<td>${n.format(f)}</td>
	<td>${n.format(i)}</td>
	<td>${n.format(c)}</td>
	<td>${n.format(p)}</td>
</tr>
`);d.find(":nth-child(2)").text(n.format(s)),d.find(":nth-child(3)").text(n.format(h)),d.find(":nth-child(4)").text(n.format(c*a))},i=(e,r,a)=>{let o=e/a;t("#textInstallment").text("Lihat tabel");let f,i,c,m=0,s=0,h=0,p=e;for(f=0;f<a;f++)h+=c=(i=(e-f*o)*r)+o,p-=o,p=p<=0?0:p,m+=o,s+=i,l.append(`
<tr>
	<th scope="row">${f+1}</th>
	<td>${n.format(o)}</td>
	<td>${n.format(i)}</td>
	<td>${n.format(c)}</td>
	<td>${n.format(p)}</td>
</tr>
`);d.find(":nth-child(2)").text(n.format(m)),d.find(":nth-child(3)").text(n.format(s)),d.find(":nth-child(4)").text(n.format(h))};e.on("click","#csCount",e=>{a();let r=Number(t("#csAmount").val().replaceAll(".","").replaceAll(",",".")),d=Number(t("#csInterest").val().replaceAll(".","").replaceAll(",","."))/12/100,c=Number(t("#csPeriod").val().replaceAll(".","").replaceAll(",",".")),m=t("#csType").val();if(t("#textPeriod").text(`${c} bulan`),t("#textAmount").text(n.format(r)),l.append(`
<tr>
	<th scope="row">0</th>
	<td>0</td>
	<td>0</td>
	<td>0</td>
	<td>${n.format(r)}</td>
</tr>`),"annuity"===m)o(r,d,c);else if("flat"===m)f(r,d,c);else{if("effective"!==m)return;i(r,d,c)}t(".result-container").css("display","")}),e.on("reset",t=>{a()}),e.on("input",'[type="text"]',function(e){let r=t(this),l=r.val();r.val(l.replace(/[^0-9.,]/,""))})});
