
resize:
	rm -f sprites && mkdir sprites
	for i in fullsize/*; do \
		convert -resize 15% $$i $${i/fullsize/sprites}; \
	done

