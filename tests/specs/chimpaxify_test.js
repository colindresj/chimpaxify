describe('Apple', function() {
    beforeEach(function() {
        this.apple = {};
        this.apple.sound = 'crunch';
    });

    afterEach(function() {
        delete this.apple;
    });

    it('should go crunch', function() {
        expect(this.apple).property('sound', 'crunch');
    });
});
