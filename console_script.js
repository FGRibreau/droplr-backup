// First dump
var amount = 100;
var coll = Droplr.DropList;

function fetchNext() {

  coll.fetch({
    data: {
      type: coll.type,
      amount: amount,
      offset: coll.offset,
      sortBy: coll.sortBy,
      order: coll.order,
      search: coll.search
    },
    update: !0,
    remove: !1,
    success: function(t, n) {
      coll.offset += amount;
      if (coll.offset === amount) {
        alert('Loading... Press <enter> to continue.');
      }
      if (n && n.length !== 0) {
        setTimeout(fetchNext, 100);
      } else {
        alert('Done! Now copy/paste and run the following command:');
        alert('copy(JSON.stringify(coll.pluck(\'code\'), null, 2));alert("Drops successfully copied to clipboard!");')
      }
    }
  })
}

fetchNext();
