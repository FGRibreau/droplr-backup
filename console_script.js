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
      if (n.length !== 0) {
        console.log('Loading...', coll.offset);
        setTimeout(fetchNext, 100);
      } else {
        console.log('Done! Now copy/paste and run the following command:');
        console.log('copy(JSON.stringify(coll.pluck(\'code\'), null, 2));console.log("Drops successfully copied to clipboard!");')
      }
    }
  })
}

fetchNext();
