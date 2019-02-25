$('select, input').change( function () {
        $this = $(this);
        $parent = $this.parent()
        console.log($this.val())
        if ( $this.val() != '' ) {
            $this.addClass('focused');
            $parent.find('.ss-icon').css({'opacity': 1});
        }
        else {
            $this.removeClass('focused');
            $parent.find('.ss-icon').css({'opacity': 0});
        }
});