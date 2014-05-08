describe('Array.prototypes', function(){
  var arr;
  beforeEach(function(){
    arr = [1,2,3]
  })
  describe('includes', function(){
    it('returns true if the array includes the argument', function(){
      expect(arr.includes(2)).toBe(true);
    });

    it('returns false if the array doesn\'t include the argument', function(){
      expect(arr.includes(4)).toBe(false);
    });
  })

  describe('clone', function(){
    it('returns a copy of the original array', function(){
      expect(arr.clone()).toEqual([1,2,3]);
    });

    it('doesn\'t return the same object', function(){
      expect(arr.clone()).not.toBe(arr);    
    });

    it('cloned array is not affected by the modification of the original', function(){
      var clone = arr.clone();
      arr.push(4);
      expect(clone).not.toEqual(arr);
    })
  })

  describe('count', function(){
    it('returns 1 if the element occurs only once', function(){
      expect(arr.count(3)).toEqual(1);
    });

    it('returns 0 if the element doesn\t exist in the array', function(){
      expect(arr.count(5)).toEqual(0);
    });

    it('returns 3 for an element that occurs 3 times', function(){
      arr.push(2);
      arr.push(2);
      expect(arr.count(2)).toEqual(3);
    });
  });

  describe('min and max', function(){
    it('min returns the smallest value of an array', function(){
      expect(arr.min()).toEqual(1);
      expect([2, 1, 3].min()).toEqual(1);
    })

    it('max returns the biggest value of an array', function(){
      expect(arr.max()).toEqual(3);
    })
  })

  describe('equals', function(){
    it('returns true if the two arrays have same length and same elements in the same order', function(){
      expect(arr.equals([1,2,3])).toBe(true);
    })



    it('returns false if the two arrays are different', function(){
      expect(arr.equals([1,3,5])).toBe(false)
      expect(arr.equals([1,3,2])).toBe(false)
      expect(arr.equals([1,2])).toBe(false)
    })
  })
});