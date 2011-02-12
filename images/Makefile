
SPRITE_PCENT=15

resize:
	-mkdir $(SPRITE_PCENT)p
	for i in fullsize/*; do \
		convert -resize $(SPRITE_PCENT)% $$i $${i/fullsize/$(SPRITE_PCENT)p}; \
	done

