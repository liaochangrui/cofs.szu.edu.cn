FOR /R "." %%s IN (*.jpg)   DO convert %%~ns.jpg -set filename:area %%wx%%h %%~ns-%%[filename:area].jpg
FOR /R "." %s IN (*.png)   DO convert %~ns.png -set filename:area %wx%h %~ns-%[filename:area].png
dir *.* /B > avatars.txt

FOR /R "." %s IN (*.png)   DO convert %~ns.png -resize 92 -set filename:area %wx%h %~ns-%[filename:area].jpg
FOR /R "." %s IN (*.jpg)   DO convert %~ns.jpg -resize 92 -set filename:area %wx%h %~ns-%[filename:area].jpg


FOR /R "." %s IN (*.gif)   DO convert %~ns.gif -resize 600 -set filename:area %wx%h %~ns-%[filename:area].jpg

convert +append banner-name.jpg banner-right.jpg banner-long.jpg

convert liuyingjie.jpg -resize 92 -set filename:area %wx%h ../liuyingjie-%[filename:area].jpg

convert zhongxiaoyong.jpg -resize 140 -set filename:area %wx%h ../zhongxiaoyong-%[filename:area].jpg